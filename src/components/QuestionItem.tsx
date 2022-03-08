import React from "react";
import styled from "styled-components";
import { QuestionType } from "../model/interfaces";

interface Props {
  question: QuestionType;
  onQuestionDelete: (qid: string) => Promise<void>;
  onQuestionEdit: (question: QuestionType) => void;
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
