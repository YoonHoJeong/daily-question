import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserIcon from "../assets/person2.png";
import { DayAnswers } from "../routes/Answers/Answers";
import UserImage from "./user/UserImage";

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
const AnswerCard = styled.li`
  margin-left: 7px;
  &:not(:first-child) {
    margin-top: 30px;
  }
`;
const AnswerContainer = styled.div`
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
const Answer = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;

  color: #4d4d4d;

  white-space: pre-line;
`;
const QuestionAnswerContainer = styled.ul`
  flex: 1;
`;

interface Props {
  date: string;
  answers: {
    [date: string]: {
      [qid: string]: {
        keyword: string;
        answers: {
          [aid: string]: {
            aid: string;
            answer: string;
            created_at: string;
          };
        };
        publish_date: string;
        qid: string;
        question: string;
      };
    };
  };
  profileOn?: boolean;
}

const AnswersByDay: React.FC<Props> = ({ date, answers, profileOn = true }) => {
  const [_, month, day] = date.split("-");

  return (
    <DateContainer>
      <SideDateBar>
        <MonthDate>
          <Month>{month}월</Month>
          <Date>{parseInt(day)}</Date>
        </MonthDate>
      </SideDateBar>
      <QuestionAnswerContainer>
        {Object.keys(answers).map((qid) => (
          <AnswerCard key={qid}>
            <Question>{answers[qid].question}</Question>
            {Object.keys(answers[qid].answers).map((aid) => (
              <AnswerContainer key={aid}>
                {profileOn && (
                  <Profile>
                    <UserImage style={{ width: "28px", height: "28px" }} />
                    <ProfileName>{"익명"}</ProfileName>
                  </Profile>
                )}
                <AnswerAndFav>
                  <Answer>{answers[qid].answers[aid].answer}</Answer>
                  <FavoriteIcon sx={{ width: "15px" }} color="disabled" />
                </AnswerAndFav>
              </AnswerContainer>
            ))}
          </AnswerCard>
        ))}
      </QuestionAnswerContainer>
    </DateContainer>
  );
};

export default AnswersByDay;
