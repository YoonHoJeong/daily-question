import React, { useEffect, useState } from "react";
import { adminApi } from "../services/adminApi";
import {
  formatDateUntilDay,
  getQuestionsUntilToday,
} from "../services/question";
import styles from "../styles.module.css";
import { Button } from "@mui/material";
import { getToday } from "../services/dateService";
import { useAuth } from "../hooks/useAuth";

interface Props {}

const LAUNCH_DATE = "2021-11-01";

function getServiceDateList() {
  const dates = [];
  const tmpDate = new Date(LAUNCH_DATE);
  const todayDate = new Date();

  while (tmpDate <= todayDate) {
    dates.push(formatDateUntilDay(tmpDate));
    tmpDate.setDate(tmpDate.getDate() + 1);
  }
  return dates;
}

interface Data {
  users: {};
  questions: {};
  answers: {};
  rates: {};
}

export const Admin: React.FC<Props> = () => {
  const [{ users, questions, answers, rates }, setData] = useState<Data>({
    users: {},
    questions: {},
    answers: {},
    rates: {},
  });
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<any[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const serviceDateList: string[] = getServiceDateList();

  const handleClickDate = (e: any) => {
    const elem = e.target as HTMLButtonElement;
    setSelectedDate(elem.name);
    setSelectedCategory("");
  };

  const handleClickCategory = (e: any) => {
    const elem = e.target as HTMLButtonElement;

    setSelectedCategory(elem.name);
  };

  useEffect(() => {
    async function fetchData() {
      const users = await adminApi.getAllUsers();
      const answers = await adminApi.getAllAnswers();
      const questions = await adminApi.getAllQuestions();
      const rates = await adminApi.getAllRates();

      setData({ users, answers, questions, rates });
      setLoading(false);
    }
    fetchData();
    console.log("admin mount");
  }, []);

  return (
    <main className={styles.adminMain}>
      <div>admin</div>
      {serviceDateList.map((date) => (
        <Button
          key={date}
          name={date}
          onClick={handleClickDate}
          variant={date === selectedDate ? "contained" : "outlined"}
        >
          {date}
        </Button>
      ))}
      {loading ? (
        <div>loading....</div>
      ) : (
        <>
          <ul>
            {categories?.map((category) => (
              <Button
                key={category.qid}
                name={category.qid}
                color="secondary"
                variant={
                  `${category.qid}` === selectedCategory
                    ? "contained"
                    : "outlined"
                }
                onClick={handleClickCategory}
              >
                {category.keyword}
              </Button>
            ))}
          </ul>
          <ul>
            {Object.keys(users).map((uid) => {
              const user = users[uid];
              let rateQids: any[] = [];
              let answerQids: any[] = [];
              if (user.rates !== undefined) {
                rateQids = Object.keys(user.rates).map((rid) => rates[rid].qid);
              }
              if (user.answers !== undefined) {
                answerQids = Object.keys(user.answers).map(
                  (aid) => answers[aid]?.qid
                );
              }
              const userQids = Array.from(
                new Set([...rateQids, ...answerQids])
              );
              const userQuestions = userQids.map((qid) => {
                const rate = Object.keys(rates)
                  .filter(
                    (rid) =>
                      rates[rid].uid === user.uid && rates[rid].qid === qid
                  )
                  .map((rid) => rates[rid])
                  .pop();
                const answer = Object.keys(answers)
                  .filter(
                    (aid) =>
                      answers[aid].uid === user.uid && answers[aid].qid === qid
                  )
                  .map((aid) => answers[aid])
                  .pop();

                return { ...questions[qid], answer, rate };
              });

              const dates: any[] = userQuestions.filter((q) => {
                console.log(q.publish_date, selectedDate);

                return q.publish_date === selectedDate;
              });

              if (dates.length <= 0) {
                return null;
              }

              return (
                <ul>
                  {userQuestions.filter((data) => {
                    const created_at = data.answer
                      ? formatDateUntilDay(new Date(data.answer.created_at))
                      : formatDateUntilDay(new Date(data.rate.created_at));

                    return created_at === selectedDate;
                  })
                    ? uid
                    : null}
                  {userQuestions
                    .filter((data) => {
                      const created_at = data.answer
                        ? formatDateUntilDay(new Date(data.answer.created_at))
                        : formatDateUntilDay(new Date(data.rate.created_at));

                      return created_at === selectedDate;
                    })
                    .map((data) => (
                      <li>
                        <div>
                          [{data.keyword}]({data.publish_date}) {data.question}
                        </div>
                        {data.answer ? (
                          <div>
                            답변:{" "}
                            {`${data.answer.created_at}: ${data.answer.answer}`}
                          </div>
                        ) : null}
                        {data.rate ? (
                          <div>
                            평점:{" "}
                            {`${data.rate.created_at}: [${data.rate.degree}] ${data.rate.comment}`}
                          </div>
                        ) : null}
                        ------------------------------------
                      </li>
                    ))}
                </ul>
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
};
