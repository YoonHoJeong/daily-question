import React, { useEffect, useState } from "react";
import { getServiceDateList } from "./admin";
import { useLocation } from "react-router";
import { getToday } from "../services/dateService";
import { Button } from "@mui/material";
import { adminApi } from "../services/adminApi";
import styles from "../styles.module.css";
import { Answer } from "../interfaces";
import { AnswerList } from "../components/answer_list";
interface Props {}

export const AdminAnswers: React.FC<Props> = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<any[]>();
  const [loading, setLoading] = useState<Boolean>(true);
  const serviceDateList: string[] = getServiceDateList();

  useEffect(() => {
    async function fetchData() {
      const answersData = await adminApi.getAllAnswers();
      setAnswers(answersData);

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
          <AnswerList
            answers={answers
              .filter(
                ({ question: { publish_date } }) =>
                  publish_date === selectedDate
              )
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              )}
          />
        </>
      )}
    </main>
  );
};
