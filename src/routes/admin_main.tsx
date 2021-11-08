import React, { useEffect, useState } from "react";
import { Data, getServiceDateList } from "./admin";
import { useLocation } from "react-router";
import { getToday } from "../services/dateService";
import { Button } from "@mui/material";
import { adminApi } from "../services/adminApi";
import { formatDateUntilDay } from "../services/question";
import styles from "../styles.module.css";
import { AdminHeader } from "../components/admin_header";

interface Props {}

export const AdminMain: React.FC<Props> = () => {
  const [{ users, questions, answers, rates }, setData] = useState<Data>({
    users: {},
    questions: {},
    answers: {},
    rates: {},
  });

  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<any[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const serviceDateList: string[] = getServiceDateList();

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
  }, []);

  const handleClickDate = (e: any) => {
    const elem = e.target as HTMLButtonElement;
    setSelectedDate(elem.name);
    setSelectedCategory("");
  };

  const handleClickCategory = (e: any) => {
    const elem = e.target as HTMLButtonElement;

    setSelectedCategory(elem.name);
  };

  return (
    <>
      <AdminHeader />
      <main className={styles.adminMain}>
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
                  rateQids = Object.keys(user.rates).map(
                    (rid) => rates[rid].qid
                  );
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
                        answers[aid].uid === user.uid &&
                        answers[aid].qid === qid
                    )
                    .map((aid) => answers[aid])
                    .pop();

                  return { ...questions[qid], answer, rate };
                });

                const dates: any[] = userQuestions.filter((q) => {
                  return q.publish_date === selectedDate;
                });

                if (dates.length <= 0) {
                  return null;
                }

                return (
                  <ul>
                    =============================================
                    <div className={styles.uid}>User Id: {uid}</div>
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
                            [{data.keyword}]({data.publish_date}){" "}
                            {data.question}
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
                          <br />
                        </li>
                      ))}
                    =============================================
                  </ul>
                );
              })}
            </ul>
          </>
        )}
      </main>
    </>
  );
};
