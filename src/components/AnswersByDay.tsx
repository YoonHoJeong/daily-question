import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { DayAnswers } from "../routes/Answers/Answers";

const DateContainer = styled.ul`
  width: 100%;
  padding: 30px;
  background-color: ${(props) => props.theme.palette.white};
  border-top: 4px solid ${(props) => props.theme.palette.bgGrey};

  display: flex;
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

  margin-left: 15px;
`;
const AnswerCard = styled.li`
  display: flex;

  margin-top: 17px;
`;
const Profile = styled.div``;
const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  background-color: grey;
`;
const ProfileName = styled.div`
  font-weight: bold;
  font-size: 10px;
  line-height: 14px;
  text-align: center;

  color: #4d4d4d;
`;

const AnswerAndFav = styled.div`
  margin-left: 12px;
`;
const Answer = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;

  color: #4d4d4d;

  white-space: pre-line;
`;
const AnswerContainer = styled.ul`
  flex: 1;
  margin-top: 17px;
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
      <AnswerContainer>
        {Object.keys(answers).map((aid) => (
          <>
            <Question>{answers[aid].question.question}</Question>
            <AnswerCard>
              <Profile>
                <ProfileImg></ProfileImg>
                <ProfileName>새러</ProfileName>
              </Profile>
              <AnswerAndFav>
                <Answer>{answers[aid].answer}</Answer>
                <FavoriteIcon sx={{ width: "15px" }} color="disabled" />
              </AnswerAndFav>
            </AnswerCard>
          </>
        ))}
      </AnswerContainer>
    </DateContainer>
  );
};

export default AnswersByDay;
