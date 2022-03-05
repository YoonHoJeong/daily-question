import { DateQidAnswers, FetchedAnswers } from "../model/interfaces";

export const formatAnswersToDateQidAnswers = (answers: FetchedAnswers) => {
  const dateQidAnswers: DateQidAnswers = Object.keys(answers).reduce(
    (obj, aid) => {
      const answer = answers[aid];
      const {
        question: { publish_date: date, qid },
        question,
      } = answer;

      if (!obj[date]) {
        obj[date] = {};
      }
      if (!obj[date][qid]) {
        obj[date][qid] = {
          question,
          answers: {},
        };
      }

      obj[date][qid].answers[aid] = answer;

      return obj;
    },
    {}
  );
  return dateQidAnswers;
};
