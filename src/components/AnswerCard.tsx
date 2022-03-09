import React from "react";
import styled from "styled-components";
import { AnswerData } from "../model/interfaces";
import UserImage from "./user/UserImage";

interface Props {
  answer: AnswerData;
  profileOn: boolean;
}

const AnswerCard: React.FC<Props> = ({ answer, profileOn }) => {
  return (
    <AnswerContainer>
      <Profile
        style={{
          display: profileOn ? "flex" : "none",
        }}
      >
        <UserImage
          style={{
            width: "28px",
            height: "28px",
          }}
        />
        <ProfileName>
          {answer.isAnonymous ? "익명" : answer.user.profile.name || "묻다"}
        </ProfileName>
      </Profile>
      <AnswerAndFav>
        <AnswerText>{answer.answer}</AnswerText>
      </AnswerAndFav>
    </AnswerContainer>
  );
};

const Profile = styled.div`
  width: 28px;
  margin-right: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileName = styled.div`
  font-weight: bold;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-top: 2px;

  color: #4d4d4d;
`;

const AnswerContainer = styled.li`
  width: 100%;
  display: flex;
`;

const AnswerAndFav = styled.div``;

const AnswerText = styled.p`
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;

  color: #4d4d4d;

  white-space: pre-line;
`;

export default AnswerCard;
