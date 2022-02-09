import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnswersByDay from "../../components/AnswersByDay";
import { useAuth } from "../../hooks/useAuth";
import {
  DailyAnswersWithQuestions,
  AnswersWithQuestions,
  UserAnswers,
} from "../../model/interfaces";
import { getUserKeeps } from "../../services/fireDB";

interface Props {}

const UserKeeps: React.FC<Props> = () => {
  const auth = useAuth();
  const [keeps, setKeeps] = useState<DailyAnswersWithQuestions>({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserKeeps(auth.user!!.uid);
      console.log(data);

      setKeeps(data);
    };
    fetchData();
  }, []);

  return (
    <KeepsContainer>
      {Object.keys(keeps)
        .reverse()
        .map((date) => (
          <AnswersByDay
            key={date}
            date={date}
            answers={keeps[date]}
            profileOn={true}
            unKeepDisappear={true}
          />
        ))}
    </KeepsContainer>
  );
};

const KeepsContainer = styled.ul``;

export default UserKeeps;
