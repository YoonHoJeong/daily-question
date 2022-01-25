import React from "react";
import AnswersByDay from "../../components/AnswersByDay";
import UserProfile from "../../components/UserProfile";
import { UserAnswers } from "./Answers";

interface Props {
  answers: UserAnswers | undefined;
}

const DailyAnswers: React.FC<Props> = ({ answers }) => {
  return (
    <div>
      <UserProfile />
      <AnswersByDay date={"2022-01-24"} answers={[]} />
    </div>
  );
};

export default DailyAnswers;
