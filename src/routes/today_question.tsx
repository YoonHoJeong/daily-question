import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../app";
import { getQuestion, submitAnswer } from "../services/question";
import styles from "../styles.module.css";
import { gaLog } from "../services/firebase";
import { Header } from "../components/header";

interface Props {}

interface LocationState {
  qid: string;
}

interface FormData {
  qid: string;
  answer: string;
}

export const TodayQuestion: React.FC<Props> = () => {
  const location = useLocation();
  const history = useHistory();
  const auth = useContext(UserContext);
  const [loading, setLoading] = useState<Boolean>(true);
  const { qid } = location.state as LocationState;
  const [question, setQuestion] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    qid: "",
    answer: "",
  });
  const answerInputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gaLog("today_questions_visited_" + qid);

    async function fetchData() {
      // You can await here
      const questionObj = await getQuestion(qid);

      setQuestion(questionObj.question);
      setFormData({ ...formData, qid });
      setLoading(false);
    }
    fetchData();
  }, [qid]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setFormData({ ...formData, answer: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { answer } = formData;
    if (answer === "") {
      alert("대답을 입력해주세요");
    } else {
      await submitAnswer(auth!!.user!!.uid, formData);
      history.push({
        pathname: "/submit-done",
        state: {
          qid,
        },
      });
    }
  };
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <form className={styles.ct} onSubmit={handleSubmit}>
      <Header history={history} />

      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        {question.split("?").map((q, idx) => (
          <Typography
            key={idx}
            className={styles.question}
            variant="h6"
            color="text.secondary"
            component="p"
          >
            {q === "" ? null : `${q}?`}
          </Typography>
        ))}

        <TextField
          ref={answerInputRef}
          className={`${styles.answerInput}`}
          fullWidth
          value={formData.answer}
          name="answer"
          onChange={handleChange}
          id="outlined-multiline-static"
          label="답변"
          multiline
          rows={4}
        />
        <section className={styles.answerBtns}>
          <Button
            variant="contained"
            size="large"
            onClick={async (e) => {
              const { answer } = formData;
              if (answer === "") {
                alert("답변을 입력해주세요!");
              } else {
                await submitAnswer(auth!!.user!!.uid, formData);
                history.push({
                  pathname: "/submit-done",
                  state: {
                    qid,
                  },
                });
              }
            }}
          >
            답변 제출하기
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={async () => {
              await submitAnswer(auth!!.user!!.uid, formData);
              history.push({
                pathname: "/submit-done",
                state: {
                  qid,
                },
              });
            }}
          >
            오늘은 질문만 볼래요!
          </Button>
        </section>
      </Container>
    </form>
  );
};
