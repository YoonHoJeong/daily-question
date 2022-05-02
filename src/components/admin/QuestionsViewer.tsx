import styled from 'styled-components';
import { useFetchQuestions } from '../../hooks/customUseQueries';
import { DateType } from '../../hooks/useDate';
import { QuestionDataModel } from '../../models/QuestionModels';
import QuestionItem from '../QuestionItem';

interface QuestionsProps {
  date: DateType;
  onQuestionDelete: (qid: string) => Promise<void>;
  onQuestionEdit: (question: QuestionDataModel) => void;
}

const QuestionsViewer: React.FC<QuestionsProps> = ({ date, onQuestionDelete, onQuestionEdit }) => {
  const { data: questions } = useFetchQuestions();

  const filteredQuestions = questions?.filter(date);

  return (
    <TodayQuestions>
      {filteredQuestions && filteredQuestions.length > 0 ? (
        filteredQuestions.map((question) => (
          <QuestionItem
            key={question.qid}
            question={question}
            onQuestionDelete={onQuestionDelete}
            onQuestionEdit={onQuestionEdit}
          />
        ))
      ) : (
        <>해당 날짜에 등록된 질문이 없습니다.</>
      )}
    </TodayQuestions>
  );
};

const TodayQuestions = styled.ul`
  border: 1px solid black;

  padding: 20px 10px;
`;

export default QuestionsViewer;
