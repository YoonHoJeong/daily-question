import styled from "styled-components";
import { AnswerWithQuestion } from "../../model/interfaces";
import { useForm } from "../../hooks/useForm";

const WeeklyAnswerCard: React.FC<{ answer: AnswerWithQuestion }> = ({
  answer,
}) => {
  const { form, onChange } = useForm({
    isPublic: answer.isPublic,
    isAnonymous: answer.isAnonymous,
  });

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
      <Options>
        <Option>
          <input
            id="isAnonymous"
            name="isAnonymous"
            checked={form.isAnonymous}
            onChange={onChange}
            type="checkbox"
          />
          <label htmlFor="isAnonymous">익명</label>
        </Option>
        <Option>
          <input
            id="isPublic"
            name="isPublic"
            checked={form.isPublic}
            onChange={onChange}
            type="checkbox"
          />
          <label htmlFor="isPublic">공개</label>
        </Option>
      </Options>
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
const QuestionText = styled.p`
  font-size: 16px;
  line-height: 20px;
  margin-top: 4px;
  color: ${(props) => props.theme.palette.blue};
  display: flex;
  & > span {
    color: ${(props) => props.theme.palette.blue};
  }
`;
const AnswerText = styled.p`
  font-size: 14px;
  margin-top: 10px;
  margin-left: 2px;
  display: flex;
`;

const Options = styled.ul`
  width: 100%;
  display: flex;
  justify-content: end;

  & > li:not(:first-child) {
    margin-left: 19px;
  }

  margin-top: 5px;
`;
const Option = styled.li`
  display: flex;
  align-items: center;

  font-size: 12px;
`;

export default WeeklyAnswerCard;
