import React from "react";
import AnswersByDay from "../../components/AnswersByDay";
import UserProfile from "../../components/UserProfile";

interface Props {
  answers: any[];
}

const DailyAnswers: React.FC<Props> = () => {
  return (
    <div>
      <UserProfile />
      <AnswersByDay date={"2022-01-24"} answers={[]} />
    </div>
  );
};

export default DailyAnswers;
