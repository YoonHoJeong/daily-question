import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "../components/admin_header";
import { adminApi } from "../services/adminApi";
import { getTomorrow } from "../services/dateService";
import { formatDateUntilDay } from "../services/question";
import styles from "../styles.module.css";
import { getServiceDateList } from "./admin";

interface Props {}

export interface QuestionForm {
  qid: string | null;
  keyword: string;
  publish_date: string;
  question: string;
}

interface Questions {
  [qid: string]: {
    keyword: string;
    question: string;
    qid: string;
    publish_date: string;
  };
}

export const EnrollQuestion: React.FC<Props> = () => {
  const [formData, setFormData] = useState<QuestionForm>({
    qid: null,
    keyword: "",
    publish_date: "",
    question: "",
  });
  const [questions, setQuestions] = useState<Questions>({});
  const [loading, setLoading] = useState<Boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateUntilDay(new Date())
  );

  useEffect(() => {
    async function fetchData() {
      const questionsData = await adminApi.getAllQuestions();
      setQuestions(questionsData);
      setLoading(false);
    }

    fetchData();
  }, []);

  const isFormValid = () => {
    const { keyword, publish_date, question } = formData;
    if (keyword === "" || publish_date === "" || question === "") {
      return false;
    }
    return true;
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        await adminApi.enrollQuestion(formData);
        alert(
          `keyword: ${formData.keyword} \npublish_date: ${formData.publish_date} \nquestion: ${formData.question} \n 질문 등록에 성공했습니다.`
        );
        setFormData({ qid: null, keyword: "", publish_date: "", question: "" });
      } catch (e) {
        alert("질문 등록에 실패했습니다.");
      }
    } else {
      alert("입력된 값들을 확인해 주세요.");
    }
  };
  const handleClickDate:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = (e) => {
    setSelectedDate(e.currentTarget.name);
  };

  const handleEditQuestion:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = async (e) => {
    const qid = e.currentTarget.name;
    const {
      publish_date,
      keyword,
      question,
      qid: qidData,
    } = await adminApi.getQuestionById(qid);
    setFormData({ publish_date, keyword, question, qid });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.enrollQuestion}>
      <form
        className={styles.questionEnrollForm}
        action=""
        onSubmit={handleSubmit}
      >
        <TextField
          value={formData?.keyword}
          required
          label="keyword"
          name="keyword"
          onChange={handleChange}
        />
        <TextField
          required
          type="date"
          name="publish_date"
          value={formData?.publish_date}
          onChange={handleChange}
        />
        <TextField
          required
          value={formData?.question}
          label="question"
          name="question"
          multiline
          fullWidth
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          질문 등록
        </Button>
      </form>
      <div className={styles.questionsContainer}>
        <ul className={styles.dateList}>
          {getServiceDateList()
            .concat([getTomorrow()])
            .map((date) => (
              <li key={date}>
                <Button
                  name={date}
                  variant={date === selectedDate ? "contained" : "outlined"}
                  onClick={handleClickDate}
                >
                  {date}
                </Button>
              </li>
            ))}
        </ul>
        <ul>
          {Object.keys(questions)
            .filter((qid) => questions[qid].publish_date === selectedDate)
            .map((qid) => {
              const q = questions[qid];

              return (
                <li key={qid}>
                  <div>
                    배포일자:
                    <span className="publish_date">{q.publish_date}</span>
                  </div>
                  <div>
                    키워드: <span className="keyword">{q.keyword}</span>
                  </div>
                  <div>
                    질문: <span className="question">{q.question}</span>
                  </div>
                  <Button
                    variant="contained"
                    color="error"
                    name={qid}
                    onClick={handleEditQuestion}
                  >
                    수정하기
                  </Button>
                  <br />
                  <br />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
