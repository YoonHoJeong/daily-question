import React, { useContext } from "react";
import { UserContext } from "../app";

interface Props {}

export const MyAnswers: React.FC<Props> = () => {
  const auth = useContext(UserContext);
  const answers = auth!!.user!!.answers;

  return (
    <ul>
      {Object.keys(answers).map((key) => {
        const answer = answers[key];

        return (
          <li>
            <div>{answer.question}</div>
            <div>{answer.answer}</div>
          </li>
        );
      })}
    </ul>
  );
};
