import React from "react";
import styled from "styled-components";
import { Answer } from "../model/interfaces";
import UserImage from "./user/UserImage";

import HeartColored from "../assets/4_heart.svg";
import HeartUnColored from "../assets/4_heart2.svg";

interface Props {
  answer: Answer;
  keptByUser: boolean;

  profileOn: boolean;
  unKeepDisappear?: boolean;
  handleKeep: (answer: Answer) => void;
  handleUnkeep: (answer: Answer) => void;
}

const AnswerCard: React.FC<Props> = ({
  answer,
  keptByUser,
  profileOn,
  unKeepDisappear = false,
  handleUnkeep,
  handleKeep,
}) => {
  if (unKeepDisappear && !keptByUser) {
    return null;
  }

  return (
    <AnswerContainer>
      <Profile>
        <UserImage
          style={{
            display: profileOn ? "flex" : "none",
            width: "28px",
            height: "28px",
          }}
        />
        <ProfileName>{answer.isAnonymous ? "익명" : "실명"}</ProfileName>
      </Profile>
      <AnswerAndFav>
        <AnswerText>{answer.answer}</AnswerText>
        {/* <KeepButton
          onClick={() => {
            if (keptByUser) {
              handleUnkeep(answer);
            } else {
              handleKeep(answer);
            }
          }}
        >
          {keptByUser ? (
            <img src={HeartColored} style={{ width: "15px" }} />
          ) : (
            <img src={HeartUnColored} style={{ width: "15px" }} />
          )}
        </KeepButton> */}
      </AnswerAndFav>
    </AnswerContainer>
  );
};

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

const AnswerContainer = styled.li`
  width: 100%;
  display: flex;

  margin-top: 17px;
`;

const AnswerAndFav = styled.div``;
const AnswerText = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 17px;

  color: #4d4d4d;

  white-space: pre-line;
`;
const KeepButton = styled.button`
  margin-top: 5px;
`;

export default AnswerCard;
