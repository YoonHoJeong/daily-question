import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../app";
import { getQuestion, submitAnswer } from "../services/question";
import styles from "../styles.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { gaLog } from "../services/firebase";

interface Props {}

interface LocationState {
  category: string;
}

interface FormData {
  category: string;
  question: string;
  answer: string;
  rate: string;
}

export const TodayQuestion: React.FC<Props> = () => {
  const location = useLocation();
  const history = useHistory();
  const auth = useContext(UserContext);
  const [loading, setLoading] = useState<Boolean>(true);
  const { category } = location.state as LocationState;
  const [formData, setFormData] = useState<FormData>({
    category,
    question: "",
    answer: "",
    rate: "",
  });
  const answerInputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gaLog("today_questions_visited_" + category);

    async function fetchData() {
      // You can await here
      const question = await getQuestion(category);

      setFormData({ ...formData, question: question.title });
      setLoading(false);
    }
    fetchData();
  }, [category]);

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
          category,
        },
      });
    }
  };
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <form className={styles.ct} onSubmit={handleSubmit}>
      <Button
        className={styles.myAnswerBtn}
        variant="contained"
        color="success"
        onClick={() => {
          history.push("/my-answers");
        }}
      >
        내 답변 보기
      </Button>
      <IconButton
        aria-label="back"
        className={styles.arrowBackBtn}
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        {formData.question.split("?").map((q, idx) => (
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
                    category,
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
                  category,
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
