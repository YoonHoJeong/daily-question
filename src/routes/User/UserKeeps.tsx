import React from "react";
import styled from "styled-components";
import AnswersByDay from "../../components/AnswersByDay";
import Loader from "../../components/common/Loader";
import { useFetchUserKeptAnswers } from "../../hooks/customUseQueries";
import { useAuth } from "../../hooks/useAuth";

interface Props {}

const UserKeeps: React.FC<Props> = () => {
  const auth = useAuth();
  const { data, isLoading } = useFetchUserKeptAnswers(auth.user?.uid || "");
  const userKeptAnswers = data ?? {};

  return (
    <KeepsContainer>
      {isLoading ? (
        <Loader />
      ) : (
        Object.keys(userKeptAnswers)
          .reverse()
          .map((date) => (
            <AnswersByDay
              key={date}
              date={date}
              answers={userKeptAnswers[date]}
              profileOn={true}
              unKeepDisappear={true}
            />
          ))
      )}
    </KeepsContainer>
  );
};

const KeepsContainer = styled.ul``;

export default UserKeeps;
