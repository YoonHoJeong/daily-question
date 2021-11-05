import React, { useEffect, useState } from "react";
import { adminApi } from "../services/adminApi";
import {
  formatDateUntilDay,
  getQuestionsUntilToday,
} from "../services/question";
import styles from "../styles.module.css";
import { Button } from "@mui/material";

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
  users: any[];
  questions: any[];
  answers: any[];
  rates: any[];
}

export const Admin: React.FC<Props> = () => {
  const [{ users, questions, answers, rates }, setData] = useState<Data>({
    users: [],
    questions: [],
    answers: [],
    rates: [],
  });
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateUntilDay(new Date())
  );
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
            {users
              .filter((user) => user.answers !== undefined)
              .map((user) => (
                <li>
                  -- {user.uid}
                  <div className="">{questions[user]}</div>
                  <div className=""></div>
                  <div className=""></div>
                  <div className=""></div>
                  =======================
                </li>
              ))}
          </ul>
        </>
      )}
    </main>
  );
};
