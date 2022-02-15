import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserImage from "./user/UserImage";
import { Answer, AnswersWithQuestions, UserKeeps } from "../model/interfaces";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import { getUserKeepsAids, keep, unKeep } from "../services/fireDB";
import { useAuth } from "../hooks/useAuth";

interface Props {
  date: string;
  answers: AnswersWithQuestions;
  profileOn?: boolean;
  unKeepDisappear?: boolean;
}

const AnswersByDay: React.FC<Props> = ({
  date,
  answers: answersWithQuestions,
  profileOn = true,
  unKeepDisappear = false,
}) => {
  const [keeps, setKeeps] = useState<UserKeeps>({});
  const auth = useAuth();
  const uid = auth.user!!.uid;
  const [_, month, day] = date.split("-");

  const handleUnkeep = (answer: Answer) => {
    setKeeps({ ...keeps, [answer.aid]: false });
    unKeep(uid, answer.aid);
  };
  const handleKeep = (answer: Answer) => {
    setKeeps({ ...keeps, [answer.aid]: true });
    keep(uid, answer.aid);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getUserKeepsAids(uid);
      setKeeps(data);
    }

    fetchData();
  }, [uid]);

  const userProfileComponent = (
    <Profile>
      <UserImage
        style={{
          display: profileOn ? "flex" : "none",
          width: "28px",
          height: "28px",
        }}
      />
      <ProfileName>{"익명"}</ProfileName>
    </Profile>
  );

  const answerCardComponent = (answer: Answer, keptByUser: boolean) => (
    <AnswerCard
      handleUnkeep={handleUnkeep}
      handleKeep={handleKeep}
      answer={answer}
      keptByUser={keptByUser}
      userProfileComponent={userProfileComponent}
      unKeepDisappear={unKeepDisappear}
    />
  );

  return (
    <DateContainer>
      <SideDateBar>
        <MonthDate>
          <Month>{parseInt(month)}월</Month>
          <Date>{parseInt(day)}</Date>
        </MonthDate>
      </SideDateBar>
      <QuestionCards>
        {Object.keys(answersWithQuestions).map((qid) => (
          <QuestionCard
            key={qid}
            answersWithQuestion={answersWithQuestions[qid]}
            keeps={keeps}
            userProfileComponent={userProfileComponent}
            answerCardComponent={answerCardComponent}
          />
        ))}
      </QuestionCards>
    </DateContainer>
  );
};

const DateContainer = styled.li`
  width: 100%;
  padding: 17px 30px;

  background-color: ${(props) => props.theme.palette.white};

  display: flex;

  border-top: 4px solid ${(props) => props.theme.palette.bgGrey};
`;
const SideDateBar = styled.div`
  display: flex;

  width: 40px;
`;
const MonthDate = styled.div``;
const Month = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  text-align: center;

  color: #888888;
`;
const Date = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  /* identical to box height */

  text-align: center;

  color: #4d4d4d;
`;

const Profile = styled.div`
  margin-right: 12px;
`;

const ProfileName = styled.div`
  font-weight: bold;
  font-size: 10px;
  line-height: 14px;
  text-align: center;

  color: #4d4d4d;
`;

const QuestionCards = styled.ul`
  flex: 1;
`;

export default AnswersByDay;
