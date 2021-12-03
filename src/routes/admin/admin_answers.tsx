import React, { useEffect, useState } from "react";
import { getToday } from "../../services/dateService";
import { adminApi } from "../../services/adminApi";
import styles from "../../styles.module.css";
import { Answer } from "../../interfaces";
import { AnswerList } from "../../components/answer_list";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent, CircularProgress } from "@mui/material";
import { LineChart, XAxis, Line, CartesianGrid, Tooltip } from "recharts";
import { formatDateUntilDay } from "../../services/question";

interface Props {}

export const AdminAnswers: React.FC<Props> = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<{}>({});
  const [selectedKeyword, setSelectedKeyword] = useState<string>("전체");
  const [selectedDate, setSelectedDate] = useState<string>();
  const [loading, setLoading] = useState<Boolean>(true);

  const [keywords, setKeywords] = useState<string[]>();

  function syncKeywords() {
    const keywordsData = Object.keys(questions)
      .filter((qid) => questions[qid].publish_date === selectedDate)
      .map((qid) => questions[qid].keyword);

    setSelectedKeyword("전체");
    setKeywords(keywordsData);
  }
  useEffect(() => {
    async function fetchData() {
      const answersData = await adminApi.getAllAnswers();
      const questions = await adminApi.getAllQuestions();

      setQuestions(questions);
      setAnswers(answersData);
      setSelectedDate(getToday());

      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    syncKeywords();
  }, [selectedDate]);

  const handleChangeDate:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (e) => {
    const newValue = e.currentTarget.value;

    setSelectedDate(newValue);
  };
  const handleChangeKeyword:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined = (e) => {
    setSelectedKeyword(e.target.value);
  };

  if (loading) {
    return <CircularProgress />;
  }

  const qDateCnts = {};
  const keywordAnswerCnts = {};
  answers.forEach((answer) => {
    const tmp_date = formatDateUntilDay(new Date(answer.created_at));
    const keyword = answer.question.keyword;
    if (qDateCnts[tmp_date]) {
      qDateCnts[tmp_date][answer.uid] = true;
    } else {
      qDateCnts[tmp_date] = {};
    }
    // keywordAnswerCnts { publish_date, cnt }
    if (keywordAnswerCnts[keyword]) {
      keywordAnswerCnts[keyword].cnt = keywordAnswerCnts[keyword].cnt + 1;
    } else {
      keywordAnswerCnts[keyword] = { publish_date: tmp_date, cnt: 1 };
    }
  });
  const qGraphData = Object.keys(keywordAnswerCnts)
    .map((keyword) => ({
      name: keyword,
      answer_cnt: keywordAnswerCnts[keyword].cnt,
      answer_rate:
        (keywordAnswerCnts[keyword].cnt * 100) /
        Object.keys(qDateCnts[keywordAnswerCnts[keyword].publish_date]).length,
    }))
    .filter(
      (data) =>
        Object.keys(qDateCnts[keywordAnswerCnts[data.name].publish_date])
          .length >= 5
    )
    .sort((a, b) => a.answer_rate - b.answer_rate);

  return (
    <main className={styles.adminMain}>
      <LineChart
        width={1500}
        height={300}
        data={qGraphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Line type="monotone" dataKey="answer_rate" stroke="red" yAxisId={0} />
      </LineChart>
      <LineChart
        width={1500}
        height={300}
        data={qGraphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="answer_cnt"
          stroke="#ff7300"
          yAxisId={0}
        />
      </LineChart>
      <ul className={styles.filterContainer}>
        <li>
          <Input
            type="date"
            className={styles.dateInput}
            defaultValue={selectedDate}
            onChange={handleChangeDate}
          />
        </li>
        <li>
          <Select
            label="키워드"
            value={selectedKeyword}
            onChange={handleChangeKeyword}
          >
            <MenuItem value="전체">전체</MenuItem>
            {keywords?.map((keyword) => (
              <MenuItem key={keyword} value={keyword}>
                {keyword}
              </MenuItem>
            ))}
          </Select>
        </li>
      </ul>
      <AnswerList
        answers={answers
          .filter(
            ({ question: { publish_date } }) => publish_date === selectedDate
          )
          .filter(
            ({ question: { keyword } }) =>
              keyword === selectedKeyword || selectedKeyword === "전체"
          )
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )}
      />
    </main>
  );
};
