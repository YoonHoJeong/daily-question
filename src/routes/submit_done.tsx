import { Button, Typography, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { useLocation, useHistory } from "react-router";
import { UserContext } from "../app";
import { submitRate } from "../services/question";
import styles from "../styles.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {}
interface LocationState {
  category: string;
}
export const SubmitDone: React.FC<Props> = () => {
  const [rate, setRate] = useState<string>("");
  const location = useLocation();
  const history = useHistory();
  const { category } = location.state as LocationState;
  const auth = useContext(UserContext);

  return (
    <div className={styles.ct}>
      <IconButton
        aria-label="back"
        className={styles.arrowBackBtn}
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Button
        variant="contained"
        color="success"
        className={styles.myAnswerBtn}
        onClick={() => {
          history.push("/my-answers");
        }}
      >
        내 대답들 보기
      </Button>
      <Box className={styles.rates}>
        <Typography
          variant="h6"
          align="center"
          className={`${rate !== "" ? `${styles.hide}` : null}`}
        >
          오늘 질문은 어떠셨나요?
        </Typography>
        <Box
          className={`${styles.rateBtnBox} ${
            rate !== "" ? `${styles.hide}` : null
          }`}
        >
          <Button
            className={styles.rateBtn}
            variant={rate === "good" ? "contained" : "outlined"}
            onClick={(e) => {
              e.preventDefault();
              setRate("good");
              submitRate(auth!!.user!!.uid, category, "good");
            }}
            name="good"
          >
            좋았어요
          </Button>
          <Button
            className={styles.rateBtn}
            variant={rate === "bad" ? "contained" : "outlined"}
            onClick={(e) => {
              e.preventDefault();
              setRate("bad");
              submitRate(auth!!.user!!.uid, category, "bad");
            }}
            color="error"
            name="bad"
          >
            아쉬워요
          </Button>
        </Box>
      </Box>
      <Typography variant="h6" align="center">
        내일 질문도 기대해주세요 😘
      </Typography>
    </div>
  );
};
