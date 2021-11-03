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

export const Admin: React.FC<Props> = () => {
  const [answers, setAnswers] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateUntilDay(new Date())
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
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
    let unsub: any;
    async function fetchData() {
      const questionsData = await getQuestionsUntilToday();
      setCategories(questionsData[selectedDate].map((q: any) => q.keyword));
    }
    setIsLoading((cur) => {
      setIsLoading(true);

      unsub = adminApi.getAnswersByDate(
        selectedDate,
        setAnswers,
        isLoading,
        setIsLoading
      );
      fetchData();
      return false;
    });

    return () => unsub();
  }, [selectedDate]);

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
      {isLoading ? (
        <div>loading....</div>
      ) : (
        <>
          <ul>
            {categories?.map((category) => (
              <Button
                key={category}
                name={category}
                color="secondary"
                variant={
                  category === selectedCategory ? "contained" : "outlined"
                }
                onClick={handleClickCategory}
              >
                {category}
              </Button>
            ))}
          </ul>
          <ul>
            {Object.keys(answers).map((aid) => {
              const answer = answers[aid];

              return (
                <li>
                  <span>{answer.created_at}</span>
                  <span>{answer.email || answer.phone_number}</span>
                  <span>{answer.answer}</span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
};
