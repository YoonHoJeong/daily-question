import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Answer,
  AnswersWithQuestions,
  DateAnswers,
  UserKeeps,
} from "../model/interfaces";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import {
  getDateQuestionAnswers,
  getUserKeepsAids,
  keep,
  unKeep,
} from "../services/fireDB";
import { useAuth } from "../hooks/useAuth";

interface Props {
  date: string;
  answers: DateAnswers;
  profileOn?: boolean;
  unKeepDisappear?: boolean;
}

const DateAnswersCard: React.FC<Props> = ({
  date,
  answers,
  profileOn = true,
  unKeepDisappear = false,
}) => {
  // const [keeps, setKeeps] = useState<UserKeeps>({});
  const auth = useAuth();
  const uid = auth.user!!.uid;
  const [_, month, day] = date.split("-");

  // const handleUnkeep = (answer: Answer) => {
  //   setKeeps({ ...keeps, [answer.aid]: false });
  //   unKeep(uid, answer.aid);
  // };
  // const handleKeep = (answer: Answer) => {
  //   setKeeps({ ...keeps, [answer.aid]: true });
  //   keep(uid, answer.aid);
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getUserKeepsAids(uid);
  //     setKeeps(data);
  //   }

  //   fetchData();
  // }, [uid]);

  const answerCardComponent = (
    answer: Answer,
    profileOn: boolean
    // keptByUser: boolean,
  ) => (
    <AnswerCard
      key={answer.aid}
      answer={answer}
      profileOn={profileOn}
      // keptByUser={keptByUser}
      // handleUnkeep={handleUnkeep}
      // handleKeep={handleKeep}
      // unKeepDisappear={unKeepDisappear}
    />
  );

  return (
    <>loading</>
    // <DateContainer>
    //   <SideDateBar>
    //     <MonthDate>
    //       <Month>{parseInt(month)}월</Month>
    //       <Date>{parseInt(day)}</Date>
    //     </MonthDate>
    //   </SideDateBar>
    //   <QuestionCards>
    //     {Object.keys(qids).map((qid) => (
    //       <QuestionCard
    //         key={qid}
    //         profileOn={true}
    //         answers={answers.filter((answer) => answer.qid === qid)}
    //         answerCardComponent={answerCardComponent}
    //         // keeps={keeps}
    //       />
    //     ))}
    //   </QuestionCards>
    // </DateContainer>
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

const QuestionCards = styled.ul`
  flex: 1;

  & > li {
    margin-left: 7px;
  }
  & > li:not(:first-child) {
    margin-top: 30px;
  }
`;

export default DateAnswersCard;
