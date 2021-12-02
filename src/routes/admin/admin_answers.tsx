import React, { useEffect, useState } from "react";
import { getToday } from "../../services/dateService";
import { adminApi } from "../../services/adminApi";
import styles from "../../styles.module.css";
import { Answer } from "../../interfaces";
import { AnswerList } from "../../components/answer_list";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";

interface Props {}

export const AdminAnswers: React.FC<Props> = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<{}>({});
  const [selectedKeyword, setSelectedKeyword] = useState<string>("전체");
  const [selectedDate, setSelectedDate] = useState<string>();
  const [loading, setLoading] = useState<Boolean>(true);

  const [keywords, setKeywords] = useState<string[]>();

  function syncKeywords() {
    console.log("syncKeywords");
    console.log(questions);

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

  return (
    <main className={styles.adminMain}>
      {loading ? (
        <div>loading....</div>
      ) : (
        <>
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
                ({ question: { publish_date } }) =>
                  publish_date === selectedDate
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
        </>
      )}
    </main>
  );
};
