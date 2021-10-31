import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../app";
import { getQuestion, submitAnswer } from "../services/question";
import styles from "../styles.module.css";

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

  useEffect(() => {
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

    const { answer, rate } = formData;
    if (answer === "") {
      alert("대답을 입력해주세요");
    } else if (rate === "") {
      alert("질문 평가를 완료해주세요");
    } else {
      await submitAnswer(auth!!.user!!.uid, formData);
      history.push("/submit-done");
    }
  };
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <form className={styles.ct} onSubmit={handleSubmit}>
      <Container
        disableGutters
        maxWidth="md"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        {formData.question.split("?").map((q) => (
          <Typography
            className={styles.question}
            variant="h6"
            color="text.secondary"
            component="p"
          >
            {q === "" ? null : `${q}?`}
          </Typography>
        ))}

        <TextField
          className={styles.answerInput}
          fullWidth
          value={formData.answer}
          name="answer"
          onChange={handleChange}
          id="outlined-multiline-static"
          label="답변"
          multiline
          rows={4}
        />

        <Button
          variant="contained"
          onClick={async () => {
            const { answer } = formData;
            if (answer === "") {
              alert("대답을 입력해주세요");
            } else {
              await submitAnswer(auth!!.user!!.uid, formData);
              history.push("/submit-done");
            }
          }}
        >
          완료
        </Button>
      </Container>
    </form>
  );
};
