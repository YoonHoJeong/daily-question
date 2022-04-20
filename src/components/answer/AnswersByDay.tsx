import AnswersByDayCardView from './AnswersByDayCardView';
import AnswersByDayBoardView from './AnswersByDayBoardView';

const AnswersByDay = {
  Weekly: AnswersByDayCardView,
  Daily: AnswersByDayBoardView,
  Board: AnswersByDayBoardView,
};

export default AnswersByDay;
