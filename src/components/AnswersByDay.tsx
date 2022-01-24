import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";

const DateContainer = styled.ul`
  padding: 30px;

  background-color: ${(props) => props.theme.palette.white};

  border-top: 4px solid ${(props) => props.theme.palette.bgGrey};
`;
const Header = styled.header`
  display: flex;
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

  &:not(:first-child) {
    margin-top: 30px;
  }
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
  margin-top: 17px;

  margin-left: 33px;
`;

interface Props {
  date: string;
  answers: any[];
}

const AnswersByDay: React.FC<Props> = ({ date }) => {
  const [_, month, day] = date.split("-");
  return (
    <DateContainer>
      <Header>
        <MonthDate>
          <Month>{month}월</Month>
          <Date>{day}</Date>
        </MonthDate>
        <Question>
          당신이 제일 좋아하는 과자는 무엇인가요? 그 과자에 얽힌 추억이 있다면
          알려주세요.
        </Question>
      </Header>

      <AnswerContainer>
        <AnswerCard>
          <Profile>
            <ProfileImg></ProfileImg>
            <ProfileName>새러</ProfileName>
          </Profile>
          <AnswerAndFav>
            <Answer>
              제일 좋아하는 과자는 아모래도... ??? 딱히 없네? 두루두루 좋아하는
              편인 것 같다. 근데 마음의 고향은, 허니버터칩! 고등학교 때 처음
              나왔을 때 구하기도 힘들었는데 그때 먹었던 맛과 이후가 왠지 달라진
              것 같다고 많이들 그래도, 나는 계속 맛있었다.
            </Answer>
            <FavoriteIcon sx={{ width: "15px" }} color="disabled" />
          </AnswerAndFav>
        </AnswerCard>
        <AnswerCard>
          <Profile>
            <ProfileImg></ProfileImg>
            <ProfileName>새러</ProfileName>
          </Profile>
          <AnswerAndFav>
            <Answer>
              제일 좋아하는 과자는 아모래도... ??? 딱히 없네? 두루두루 좋아하는
              편인 것 같다. 근데 마음의 고향은, 허니버터칩! 고등학교 때 처음
              나왔을 때 구하기도 힘들었는데 그때 먹었던 맛과 이후가 왠지 달라진
              것 같다고 많이들 그래도, 나는 계속 맛있었다.
            </Answer>
            <FavoriteIcon sx={{ width: "15px" }} color="disabled" />
          </AnswerAndFav>
        </AnswerCard>
        <AnswerCard>
          <Profile>
            <ProfileImg></ProfileImg>
            <ProfileName>새러</ProfileName>
          </Profile>
          <AnswerAndFav>
            <Answer>
              제일 좋아하는 과자는 아모래도... ??? 딱히 없네? 두루두루 좋아하는
              편인 것 같다. 근데 마음의 고향은, 허니버터칩! 고등학교 때 처음
              나왔을 때 구하기도 힘들었는데 그때 먹었던 맛과 이후가 왠지 달라진
              것 같다고 많이들 그래도, 나는 계속 맛있었다.
            </Answer>
            <FavoriteIcon sx={{ width: "15px" }} color="disabled" />
          </AnswerAndFav>
        </AnswerCard>
      </AnswerContainer>
    </DateContainer>
  );
};

export default AnswersByDay;
