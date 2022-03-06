import styled from "styled-components";
import { Answer } from "../../model/interfaces";
import { useForm } from "../../hooks/useForm";
import AnswerOptionCheckBoxes from "../../components/AnswerOptionCheckBoxes";
import { SyntheticEvent } from "react";
import { updateAnswer } from "../../services/fireDB";
import {
  useFetchBoardAnswers,
  useFetchUserAnswers,
} from "../../hooks/customUseQueries";
import { useAuth } from "../../hooks/useAuth";

const ConvertPublicMessage = "공개 글로 전환하시겠어요?";
const ConvertPrivateMessage = "비공개 글로 전환하시겠어요?";
const ConvertAnonymousMessage = "익명 글로 전환하시겠어요?";
const ConvertRealnameMessage = "실명 글로 전환하시겠어요?";
const ConfirmMessages = {
  isPublic: {
    true: ConvertPrivateMessage,
    false: ConvertPublicMessage,
  },
  isAnonymous: {
    true: ConvertRealnameMessage,
    false: ConvertAnonymousMessage,
  },
};

interface Props {
  answers: { [aid: string]: Answer };
}

const WeeklyAnswerCard: React.FC<Props> = ({ answers }) => {
  const answer = Object.values(answers)[0];
  const { form, setProperty } = useForm({
    isPublic: answer.isPublic ?? false,
    isAnonymous: answer.isAnonymous ?? false,
  });
  const auth = useAuth();

  const { refetch: userAnswersRefetch } = useFetchUserAnswers(auth.user!!.uid);
  const { refetch: boardAnswersRefetch } = useFetchBoardAnswers();

  const onClickCheckbox = async (e: SyntheticEvent) => {
    e.preventDefault();
    const elem = e.currentTarget as HTMLInputElement;
    const currentValue = form[elem.name] ?? false;
    const confirmMessage = ConfirmMessages[elem.name][currentValue];

    const response = window.confirm(confirmMessage);
    if (response === true) {
      setProperty(elem.name, !currentValue);
      await updateAnswer(answer, { [elem.name]: !currentValue });
      await userAnswersRefetch();
      await boardAnswersRefetch();
    }
  };

  return (
    <Container>
      <CardContainer>
        <KeywordText>{answer.question.keyword}</KeywordText>
        <QuestionText>
          Q.<p>{answer.question.question}</p>
        </QuestionText>
        <AnswerText>
          A.<p>{answer.answer}</p>
        </AnswerText>
      </CardContainer>
      <AnswerOptionCheckBoxes form={form} onClickCheckbox={onClickCheckbox} />
    </Container>
  );
};

const Container = styled.li``;

const CardContainer = styled.div`
  padding: 10px 16px;
  padding-bottom: 19px;

  border: 1px solid ${(props) => props.theme.palette.grey};
  border-radius: 10px;

  line-height: 19px;
  /* identical to box height */

  width: 300px;
  background-color: ${(props) => props.theme.palette.white};
`;

const KeywordText = styled.p`
  font-size: 12px;
  color: ${(props) => props.theme.palette.deepGrey};
`;
const QuestionText = styled.div`
  font-size: 15px;
  line-height: 20px;
  margin-top: 4px;
  color: ${(props) => props.theme.palette.blue};
  display: flex;
  & > p {
    color: ${(props) => props.theme.palette.blue};
    margin-left: 4px;
  }
`;
const AnswerText = styled.div`
  font-size: 14px;
  margin-top: 10px;
  margin-left: 2px;
  display: flex;

  & > p {
    margin-left: 4px;
  }
`;

export default WeeklyAnswerCard;
