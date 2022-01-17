import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnswerCard from "../components/AnswerCard";
import { useAuth } from "../hooks/useAuth";
import { useFireDBFetch } from "../hooks/useFireDBFetch";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Weeks = styled.ul``;
const Week = styled.li``;
const Dates = styled.ul``;
const Date = styled.li``;

const AnswerList = styled.ul``;

const HelperText = styled.p``;
const AnswerDateCount = styled.span`
  color: blue;
`;

interface Props {}

const Answers: React.FC<Props> = () => {
  const auth = useAuth();
  const uid = auth?.user?.uid || "";
  const {
    data: answers,
    loading,
    error,
  } = useFireDBFetch<any>(`user-answers/${uid}`);
  const [selectedWeek, setSelectedWeek] = useState<string | undefined>();

  useEffect(() => {
    setSelectedWeek(Object.keys(answers).pop());
  }, [answers]);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Container>
      {selectedWeek ? (
        <>
          <Weeks>
            {Object.keys(answers).map((week) => {
              const weekArr = week.replace("W", "-").split("-");
              return (
                <Week>{`${weekArr[0]}년 ${weekArr[1]}월 ${weekArr[2]}주차`}</Week>
              );
            })}
          </Weeks>

          <HelperText>
            5일 중{" "}
            <AnswerDateCount>
              {Object.keys(answers[selectedWeek]).length}일
            </AnswerDateCount>{" "}
            대답했어요.
          </HelperText>
          <Dates>
            {Object.keys(answers[selectedWeek]).map((date) => (
              <Date key={date}>{date}</Date>
            ))}
          </Dates>

          <AnswerList></AnswerList>
        </>
      ) : (
        <p>등록된 답변이 없습니다.</p>
      )}
    </Container>
  );
};

export default Answers;
