import React, { useEffect, useState } from "react";
import { adminApi } from "../services/adminApi";
import {
  formatDateUntilDay,
  getQuestionsUntilToday,
} from "../services/question";
import styles from "../styles.module.css";
import { Button } from "@mui/material";
import axios from "axios";

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
  const [categories, setCategories] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const serviceDateList: string[] = getServiceDateList();
  const [ip, setIP] = useState("");

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data);
    setIP(res.data.IPv4);
  };

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
      setCategories(
        questionsData[selectedDate].map((q: any) => ({
          qid: q.qid,
          keyword: q.keyword,
        }))
      );
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
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
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
      {isLoading ? (
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
            {Object.keys(answers).map((aid) => {
              const answer = answers[aid];

              if (
                selectedCategory === "" ||
                `${answer.qid}` === selectedCategory
              ) {
                return (
                  <li>
                    <span>{answer.created_at} | </span>
                    <span>{answer.uid} | </span>
                    <span>{answer.answer}</span>
                  </li>
                );
              }
            })}
          </ul>
        </>
      )}
    </main>
  );
};
