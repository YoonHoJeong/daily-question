import { Button, CircularProgress, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { adminApi } from "../../services/adminApi";
import { formatDateUntilDay } from "../../services/question";
import styles from "./admin_enroll_question.module.css";

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
  async function fetchData() {
    const questionsData = await adminApi.getAllQuestions();
    setQuestions(questionsData);
    setLoading(false);
  }

  useEffect(() => {
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
  const handleEnrollQuestion = async (e: any) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        await adminApi.enrollQuestion(formData);
        alert(
          `keyword: ${formData.keyword} \npublish_date: ${formData.publish_date} \nquestion: ${formData.question} \n 질문 등록에 성공했습니다.`
        );
        setFormData({ qid: null, keyword: "", publish_date: "", question: "" });
        fetchData();
      } catch (e) {
        alert("질문 등록에 실패했습니다.");
      }
    } else {
      alert("입력된 값들을 확인해 주세요.");
    }
  };
  const handleChangeDate:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (e) => {
    setSelectedDate(e.currentTarget.value);
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
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> | undefined =
    async (e) => {
      const confirm = window.confirm("정말 삭제하시겠습니까?");
      const qid = e.currentTarget.name;
      // console.log(qid, confirm);
      if (confirm) {
        await adminApi.deleteQuestion(qid);
        fetchData();
      }
    };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.enrollQuestion}>
      <form
        className={styles.questionEnrollForm}
        action=""
        onSubmit={handleEnrollQuestion}
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
        <Button variant="contained" onClick={handleEnrollQuestion}>
          질문 등록
        </Button>
      </form>
      <div className={styles.questionsContainer}>
        <Input
          type="date"
          className={styles.dateInput}
          defaultValue={selectedDate}
          onChange={handleChangeDate}
        />
        <table>
          <tbody>
            <tr className={styles.tr}>
              <th className={styles.th}>keyword</th>
              <th className={styles.th}>question</th>
              <th></th>
            </tr>
            {Object.keys(questions)
              .filter((qid) => questions[qid].publish_date === selectedDate)
              .map((qid) => {
                const q = questions[qid];

                return (
                  <tr key={qid} className={styles.tr}>
                    <td className={styles.td}>{q.keyword}</td>
                    <td className={styles.td}>
                      <pre>{q.question}</pre>
                    </td>
                    <td className={styles.td}>
                      <Button
                        variant="contained"
                        color="warning"
                        name={qid}
                        style={{ marginRight: "5px" }}
                        onClick={handleEditQuestion}
                      >
                        수정
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        name={qid}
                        onClick={handleDelete}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
