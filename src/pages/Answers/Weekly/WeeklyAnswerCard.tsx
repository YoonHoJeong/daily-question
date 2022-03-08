import styled from "styled-components";
import { AnswerType } from "../../../model/interfaces";
import { useForm } from "../../../hooks/useForm";
import AnswerOptionCheckBoxes from "../../../components/AnswerOptionCheckBoxes";
import { SyntheticEvent } from "react";
import {
  useFetchBoardAnswers,
  useFetchUserAnswers,
} from "../../../hooks/customUseQueries";
import { useAuth } from "../../../hooks/useAuth";
import { Answer } from "../../../services/AnswerApi";

interface Props {
  answers: { [aid: string]: AnswerType };
}

const WeeklyAnswerCard: React.FC<Props> = ({ answers }) => {
  const answer = new Answer(Object.values(answers)[0]);

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
      // await updateAnswer(answer.aid, answer.uid, {
      //   [elem.name]: !currentValue,
      // });
      await answer.update({ [elem.name]: !currentValue });
      await userAnswersRefetch();
      await boardAnswersRefetch();
    }
  };

  return (
    <Container>
      <CardContainer>
        <KeywordText>{answer.keyword}</KeywordText>
        <QuestionText>
          Q.<p>{answer.question}</p>
        </QuestionText>
        <AnswerText>
          A.<p>{answer.answerText}</p>
        </AnswerText>
      </CardContainer>
      <AnswerOptionCheckBoxes form={form} onClickCheckbox={onClickCheckbox} />
    </Container>
  );
};

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
