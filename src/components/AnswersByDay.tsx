import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserIcon from "../assets/person2.png";
import { DayAnswers } from "../routes/Answers/Answers";

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
const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  padding: 5px;
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
  answers: DayAnswers;
}

const AnswersByDay: React.FC<Props> = ({ date, answers }) => {
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
        {Object.keys(answers).map((aid) => (
          <AnswerCard key={aid}>
            <Question>{answers[aid].question.question}</Question>
            <AnswerContainer>
              {/* <Profile>
                <ProfileImg src={UserIcon} />
                <ProfileName>{answers[aid].uid}</ProfileName>
              </Profile> */}
              <AnswerAndFav>
                <Answer>{answers[aid].answer}</Answer>
                <FavoriteIcon sx={{ width: "15px" }} color="disabled" />
              </AnswerAndFav>
            </AnswerContainer>
          </AnswerCard>
        ))}
      </QuestionAnswerContainer>
    </DateContainer>
  );
};

export default AnswersByDay;
