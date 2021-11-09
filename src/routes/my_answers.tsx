import { Button, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../app";
import { AnswerItem } from "../components/answer_item";
import { gaLog } from "../services/firebase";
import { formatDateUntilDay, getUserAnswers } from "../services/question";
import commonStyles from "../styles.module.css";
import ownStyles from "./my_answers.module.css";
import { getServiceDateList } from "./admin";
import dateService from "../services/dateService";

let styles = Object.assign(commonStyles, ownStyles);

interface Props {}

interface LocationState {
  qid?: string;
  from: string;
  rateSubmitted?: Boolean;
}

export const MyAnswers: React.FC<Props> = () => {
  const auth = useContext(UserContext);

  const [loading, setLoading] = useState<Boolean>(true);
  const [answers, setAnswers] = useState<any[]>([]);
  const [dateList, setDateList] = useState<string[]>([]);
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
      console.log(data);
      let tmpDateList: string[] = [];
      data.forEach((answer) => {
        const dateString = formatDateUntilDay(new Date(answer.created_at));
        if (!tmpDateList.includes(dateString)) {
          const weekDates = dateService.getWeekDateListByDate(
            new Date(dateString)
          );
          tmpDateList = tmpDateList.concat(weekDates);
        }
      });
      setDateList(tmpDateList);
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleClickGoBack = () => {
    history.replace({
      pathname: from,
      state: {
        qid,
        rateSubmitted,
      },
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={`${styles.myAnswersContainer}`}>
      <Button className={styles.backBtn} onClick={handleClickGoBack}>
        뒤로가기
      </Button>

      <div className={styles.myAnswersMain}>
        <section>
          <div>총 5일 중 4일 작성하셨어요.</div>
        </section>
        <section>
          <ul>
            {dateList.map((date) => (
              <li>{date}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
