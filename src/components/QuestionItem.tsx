import React from "react";
import styled from "styled-components";
import { QuestionData } from "../model/interfaces";

interface Props {
  question: QuestionData;
  onQuestionDelete: (qid: string) => Promise<void>;
  onQuestionEdit: (question: QuestionData) => void;
}

const QuestionContainer = styled.li``;
const QuestionText = styled.p``;
const Keyword = styled.span``;
const EditButton = styled.button``;
const DeleteButton = styled.button``;

const QuestionItem: React.FC<Props> = ({
  question,
  onQuestionDelete,
  onQuestionEdit,
}) => {
  return (
    <QuestionContainer>
      <Keyword>{question.keyword}</Keyword>
      <QuestionText>{question.question}</QuestionText>
      <EditButton
        onClick={() => {
          onQuestionEdit(question);
        }}
      >
        수정하기
      </EditButton>
      <DeleteButton
        onClick={() => {
          onQuestionDelete(question.qid);
        }}
      >
        삭제하기
      </DeleteButton>
    </QuestionContainer>
  );
};

export default QuestionItem;
