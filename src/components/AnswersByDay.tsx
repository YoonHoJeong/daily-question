import React, { useState } from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserImage from "./user/UserImage";
import HeartColored from "../assets/4_heart.svg";
import { useAuth } from "../hooks/useAuth";
import { keep, unKeep } from "../services/fireDB";
import {
  Answer,
  AnswersWithQuestion,
  AnswersWithQuestions,
} from "../model/interfaces";

interface Props {
  date: string;
  answers: AnswersWithQuestions;
  profileOn?: boolean;
  unKeepDisappear?: boolean;
}

interface AnswerCardProps {
  answer: Answer;
}

const AnswersByDay: React.FC<Props> = ({
  date,
  answers: answersWithQuestions,
  profileOn = true,
  unKeepDisappear = false,
}) => {
  const [_, month, day] = date.split("-");
  const auth = useAuth();
  const uid = auth.user?.uid || "";

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

  const AnswerCard: React.FC<AnswerCardProps> = ({ answer }) => {
    const [isKept, setIsKept] = useState<boolean>(
      auth.user?.keeps[answer.aid] ? true : false
    );
    const handleClickKeep = () => {
      setIsKept(!isKept);

      if (isKept) {
        unKeep(uid, answer.aid);
      } else {
        keep(uid, answer.aid);
      }
    };

    if (unKeepDisappear && !isKept) {
      return null;
    }

    return (
      <AnswerContainer>
        {userProfileComponent}
        <AnswerAndFav>
          <AnswerText>{answer.answer}</AnswerText>
          <button onClick={handleClickKeep}>
            {isKept ? (
              <img src={HeartColored} style={{ width: "15px" }} />
            ) : (
              <FavoriteIcon sx={{ width: "15px" }} color="disabled" />
            )}
          </button>
        </AnswerAndFav>
      </AnswerContainer>
    );
  };

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
            AnswerCardComponent={AnswerCard}
          />
        ))}
      </QuestionCards>
    </DateContainer>
  );
};

const QuestionCard: React.FC<{
  answersWithQuestion: AnswersWithQuestion;
  AnswerCardComponent: React.FC<AnswerCardProps>;
}> = ({ answersWithQuestion, AnswerCardComponent }) => {
  return (
    <QuestionCardContainer>
      <Question>{answersWithQuestion.question}</Question>
      <Answers>
        {Object.keys(answersWithQuestion.answers).map((aid) => (
          <AnswerCardComponent
            key={aid}
            answer={answersWithQuestion.answers[aid]}
          />
        ))}
      </Answers>
    </QuestionCardContainer>
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
const Question = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  color: #515fa9;
  white-space: pre-line;
`;
const QuestionCardContainer = styled.li`
  margin-left: 7px;
  &:not(:first-child) {
    margin-top: 30px;
  }
`;
const Answers = styled.ul`
  width: 100%;
`;

const AnswerContainer = styled.li`
  width: 100%;
  display: flex;

  margin-top: 17px;
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

const AnswerAndFav = styled.div``;
const AnswerText = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;

  color: #4d4d4d;

  white-space: pre-line;
`;
const QuestionCards = styled.ul`
  flex: 1;
`;

export default AnswersByDay;
