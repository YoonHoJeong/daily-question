import React, { useEffect, useState } from "react";
import { adminApi } from "../services/admin";
import styles from "../styles.module.css";

interface Props {}

export const Admin: React.FC<Props> = () => {
  const [answers, setAnswers] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsub = adminApi.getAllAnswers(setAnswers, setIsLoading);
    return () => unsub();
  }, []);

  return (
    <main className={styles.adminMain}>
      <div>admin</div>
      {isLoading ? (
        <div>loading....</div>
      ) : (
        <ul className={styles.answerList}>
          {Object.keys(answers).map((key) => {
            const answerObj = answers[key];
            return (
              <li key={key}>
                <div>작성자: {answerObj.uid}</div>
                <div>작성일자: {answerObj.created_at}</div>
                <div>질문: {answerObj.question}</div>
                <div>대답: {answerObj.answer}</div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};
