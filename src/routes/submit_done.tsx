import { Button, Typography, Rating, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { UserContext } from "../app";
import { submitRate } from "../services/question";
import styles from "../styles.module.css";
import { gaLog } from "../services/firebase";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { Header } from "../components/header";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon fontSize="large" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon fontSize="large" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon fontSize="large" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon fontSize="large" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon fontSize="large" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: any) {
  const { value, ...other } = props;
  return (
    <>
      <span {...other} onClick={(e) => {}}>
        {customIcons[value].icon}
      </span>
    </>
  );
}

interface Props {}
interface LocationState {
  qid: string;
}
export const SubmitDone: React.FC<Props> = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Boolean>(false);
  const location = useLocation();
  const history = useHistory();
  const { qid } = location.state as LocationState;
  const auth = useContext(UserContext);
  useEffect(() => {
    gaLog("submit_done_visited");
  }, []);

  const handleSubmitRate = async (e: any) => {
    e.preventDefault();

    if (rate !== null) {
      await submitRate(auth!!.user!!.uid, qid, rate, comment);
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.ct}>
      <Header history={history} />

      <Box className={`${styles.rates} ${submitted ? styles.hide : null}`}>
        <Typography variant="h6" align="center">
          오늘 질문은 어떠셨나요?
        </Typography>
        <Rating
          name="highlight-selected-only"
          defaultValue={0}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
          size="large"
          IconContainerComponent={IconContainer}
          highlightSelectedOnly
        />

        <TextField
          className={`${styles.commentInput} ${
            rate === null ? `${styles.hide}` : null
          }`}
          id="outlined-multiline-static"
          fullWidth
          label="소감을 작성해주세요."
          multiline
          rows={4}
          onChange={(e) => {
            setComment(e.currentTarget.value);
          }}
          value={comment === null ? "" : comment}
        />
        <Button
          className={`${styles.rateBtnBox} ${
            rate === null ? `${styles.hide}` : null
          }`}
          variant="contained"
          fullWidth
          onClick={handleSubmitRate}
        >
          소감 제출하기
        </Button>
      </Box>
      <Typography
        className={`${submitted ? null : styles.hide}`}
        variant="h6"
        align="center"
      >
        내일 질문도 기대해주세요 😘
      </Typography>
    </div>
  );
};
