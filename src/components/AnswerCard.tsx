import React from "react";
import styled from "styled-components";
import { Answer } from "../model/interfaces";
import HeartColored from "../assets/4_heart.svg";
import HeartUnColored from "../assets/4_heart2.svg";

interface Props {
  answer: Answer;
  keptByUser: boolean;

  userProfileComponent: JSX.Element;
  unKeepDisappear?: boolean;
  handleKeep: (answer: Answer) => void;
  handleUnkeep: (answer: Answer) => void;
}

const AnswerCard: React.FC<Props> = ({
  answer,
  keptByUser,
  userProfileComponent,
  unKeepDisappear = false,
  handleUnkeep,
  handleKeep,
}) => {
  if (unKeepDisappear && !keptByUser) {
    return null;
  }

  return (
    <AnswerContainer>
      {userProfileComponent}
      <AnswerAndFav>
        <AnswerText>{answer.answer}</AnswerText>
        <KeepButton
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
        </KeepButton>
      </AnswerAndFav>
    </AnswerContainer>
  );
};

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
