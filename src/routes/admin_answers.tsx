import React, { useEffect, useState } from "react";
import { getToday } from "../services/dateService";
import { adminApi } from "../services/adminApi";
import styles from "../styles.module.css";
import { Answer } from "../interfaces";
import { AnswerList } from "../components/answer_list";
import Input from "@mui/material/Input";

interface Props {}

export const AdminAnswers: React.FC<Props> = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const answersData = await adminApi.getAllAnswers();
      setAnswers(answersData);

      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChangeDate:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (e) => {
    const newValue = e.currentTarget.value;

    setSelectedDate(newValue);
  };

  return (
    <main className={styles.adminMain}>
      <Input
        type="date"
        defaultValue={selectedDate}
        onChange={handleChangeDate}
      />
      {/* 
      {serviceDateList.map((date) => (
        <Button
          key={date}
          name={date}
          onClick={handleClickDate}
          variant={date === selectedDate ? "contained" : "outlined"}
        >
          {date}
        </Button>
      ))} */}
      {loading ? (
        <div>loading....</div>
      ) : (
        <>
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
