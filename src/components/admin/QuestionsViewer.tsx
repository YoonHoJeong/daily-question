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

  if (questions === undefined || questions.size === 0) return <span>등록된 질문이 없습니다.</span>;

  const filteredQuestions = questions.filter(date);

  return (
    <TodayQuestions>
      {filteredQuestions.map((question) => (
        <QuestionItem
          key={question.qid}
          question={question}
          onQuestionDelete={onQuestionDelete}
          onQuestionEdit={onQuestionEdit}
        />
      ))}
    </TodayQuestions>
  );
};

const TodayQuestions = styled.ul``;

export default QuestionsViewer;
