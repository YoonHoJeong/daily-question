import { Button, Typography, Rating, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { UserContext } from "../../app";
import { submitRate } from "../../services/question";
import styles from "../../styles.module.css";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

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
  rateSubmitted?: Boolean;
}

export const SubmitDone: React.FC<Props> = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Boolean>(false);
  const location = useLocation();
  const history = useHistory();
  const { qid, rateSubmitted } = location.state as LocationState;
  const auth = useContext(UserContext);
  useEffect(() => {
    rateSubmitted && setSubmitted(rateSubmitted);
  }, []);

  const handleSubmitRate = async (e: any) => {
    e.preventDefault();

    if (rate !== null) {
      await submitRate(auth!!.user!!.uid, qid, rate, comment);
      setSubmitted(true);
    }
  };
  const handleClickOtherQuestions:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    history.push({
      pathname: "/select-category",
      state: {
        isKeywordsOn: true,
      },
    });
  };

  return (
    <div>
      {submitted ? (
        <div className={styles.ratingDone}>
          <Typography
            className={`${submitted ? null : styles.hide}`}
            variant="h6"
            align="center"
          >
            내일도 기대해주세요 😊
          </Typography>
          <Button
            id="myanswer"
            variant="contained"
            color="success"
            fullWidth
            onClick={() => {
              history.push({
                pathname: "/my-answers",
                state: {
                  qid,
                  from: "/submit-done",
                  rateSubmitted: true,
                },
              });
            }}
          >
            내 답변 보기
          </Button>
          <Button
            id="anotherkeyword"
            fullWidth
            variant="contained"
            onClick={handleClickOtherQuestions}
          >
            다른 질문 확인하기
          </Button>
        </div>
      ) : (
        <Box className={`${styles.rates} ${submitted ? styles.hide : null}`}>
          <Typography variant="h6" align="center">
            오늘의 질문은 어떠셨나요?
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
            label="소감을 작성해 주세요."
            placeholder="어떤 의견이라도 좋아요. 😀"
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
      )}
    </div>
  );
};
