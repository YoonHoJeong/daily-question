import {
  endBefore,
  equalTo,
  get,
  onValue,
  orderByChild,
  query,
  ref,
  startAt,
} from "@firebase/database";
import { fireDB } from "./firebase";
import { formatDateUntilDay } from "./question";

export const adminApi = {
  getAllAnswers: (
    setAnswers: React.Dispatch<any>,
    setIsLoading: React.Dispatch<React.SetStateAction<Boolean>>
  ) => {
    const answersRef = ref(fireDB, "/answers");

    return onValue(answersRef, async (snapshot) => {
      setIsLoading(true);
      let value = snapshot.val();
      console.log(value);

      if (value !== null) {
        const qSnapshot = await get(ref(fireDB, `/questions/${value.qid}`));
        const questionObj = qSnapshot.val();

        if (questionObj !== null) {
          value["question"] = questionObj.question;
          const aSnapshot = await get(ref(fireDB, `/answers/${value.qid}`));
          const answerObj = aSnapshot.val();
          const userSnapshot = await get(ref(fireDB, `/users/${value.uid}`));
          const userObj = userSnapshot.val();
        }
        setAnswers(value);
        setIsLoading(false);
      }
    });
  },
  getAllQuestions: (
    setQuestions: React.Dispatch<any>,
    isLoading: Boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<Boolean>>
  ) => {
    const questionsRef = ref(fireDB, "/questions");
    return onValue(questionsRef, async (snapshot) => {
      const questions = snapshot.val();
      Object.keys(questions).map((key) => {
        const q = questions[key];
      });
      setIsLoading(false);
    });
  },
  getQuestionsByDate: (date: string) => {
    const qQuery = query(
      ref(fireDB, "/questions"),
      orderByChild("publish_date"),
      equalTo(date)
    );
    const unsub = onValue(qQuery, (snapshot) => {
      console.log(snapshot.val());
    });

    return unsub;
  },
  getAnswersByDate: (
    date: string,
    setAnswers: React.Dispatch<any>,
    isLoading: Boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<Boolean>>
  ) => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = formatDateUntilDay(tomorrow);

    const qQuery = query(
      ref(fireDB, "/answers"),
      orderByChild("created_at"),
      startAt(date),
      endBefore(tomorrowString)
    );
    const unsub = onValue(qQuery, (snapshot) => {
      console.log(snapshot.val());
      setAnswers(snapshot.val());
      setIsLoading(false);
    });

    return unsub;
  },
};
