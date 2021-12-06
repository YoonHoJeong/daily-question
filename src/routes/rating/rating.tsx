import { Button, TextField, Rating, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import styles from "./rating.module.css";
import { submitRate } from "../../services/question";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { UserContext } from "../../app";
import { Box } from "@mui/system";

interface LocationState {
  qid: string;
  rateSubmitted?: Boolean;
}

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

export const RatingPage: React.FC<Props> = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const location = useLocation();
  const { qid, rateSubmitted } = location.state as LocationState;

  const history = useHistory();
  const auth = useContext(UserContext);

  const handleSubmitRate = async (e: any) => {
    e.preventDefault();

    if (rate !== null) {
      await submitRate(auth!!.user!!.uid, qid, rate, comment);
      history.push({
        pathname: "/submit-done",
        state: {
          from: "/rating",
        },
      });
    }
  };

  return (
    <Box className={`${styles.rates}`}>
      <Typography variant="h6" align="center">
        오늘의 질문은 어떠셨나요?
      </Typography>
      <Rating
        name="highlight-selected-only"
        defaultValue={0}
        onChange={(_, newValue) => {
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
        placeholder="어떤 의견이라도 좋아요. "
        multiline
        rows={4}
        onChange={(e) => {
          setComment(e.currentTarget.value);
        }}
        value={comment === null ? "" : comment}
      />
      <Button
        id="rating"
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
  );
};
