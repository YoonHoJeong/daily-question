import React from "react";
import { Answer } from "../interfaces";
import styles from "./answer_list.module.css";

interface Props {
  answers: Answer[];
}

export const AnswerList: React.FC<Props> = ({ answers }) => {
  return (
    <>
      <div className={styles.summary}>
        <div>답변 수: {answers.length}개</div>
        <div>
          작성 유저 수: {new Set(answers.map((answer) => answer.uid)).size}명
        </div>
        <div>최근 답변 등록 시간: {answers[0].created_at}</div>
      </div>
      <table className={styles.answerTable}>
        <tbody>
          <tr>
            <th className={styles.th}>created Date</th>
            <th className={styles.th}>user_id</th>
            <th className={styles.th}>keyword</th>
            <th className={styles.th}>answer</th>
            <th className={styles.th}>rate</th>
            <th className={styles.th}>comment</th>
          </tr>
          {answers.map(
            ({
              aid,
              answer,
              created_at,
              question: { keyword },
              uid,
              rate: { degree, comment } = { degree: 0, comment: "-" },
            }) => (
              <tr key={aid}>
                <td className={styles.td}>
                  {created_at.split("T")[1]
                    ? created_at.split("T")[1]
                    : created_at}
                </td>
                <td className={styles.td}>{uid}</td>
                <td className={styles.td}>{keyword}</td>
                <td className={styles.td}>{answer}</td>
                <td className={styles.td}>{degree}</td>
                <td className={styles.td}>{comment}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};
