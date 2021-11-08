import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../app";
import { AnswerItem } from "../components/answer_item";
import { gaLog } from "../services/firebase";
import { getUserAnswers } from "../services/question";
import styles from "../styles.module.css";

interface Props {}

interface LocationState {
  qid: string;
  from: string;
  rateSubmitted?: Boolean;
}

export const MyAnswers: React.FC<Props> = () => {
  const auth = useContext(UserContext);

  const [loading, setLoading] = useState<Boolean>(true);
  const [answers, setAnswers] = useState<any[]>([]);
  const history = useHistory();
  const location = useLocation();
  const { qid, from, rateSubmitted } = location.state as LocationState;

  useEffect(() => {
    gaLog("my_answers_visited");
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserAnswers(auth!!.user);
      setAnswers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={`${styles.ct} ${styles.myAnswersContainer}`}>
      <Button
        className={styles.backBtn}
        onClick={() => {
          history.replace({
            pathname: from,
            state: {
              qid,
              rateSubmitted,
            },
          });
        }}
      >
        뒤로가기
      </Button>
      <ul>
        {answers !== undefined ? (
          answers.map((answer) => {
            return <AnswerItem key={answer.aid} answer={answer} />;
          })
        ) : (
          <Typography variant="h6">등록된 답변이 없습니다!</Typography>
        )}
      </ul>
    </div>
  );
};
