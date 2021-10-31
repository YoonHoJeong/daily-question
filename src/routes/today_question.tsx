import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../app";
import { getQuestion, submitAnswer } from "../services/question";

interface Props {}

interface LocationState {
  category: string;
}
interface FormData {
  category: string;
  question: string;
  answer: string;
  rate: string;
}

export const TodayQuestion: React.FC<Props> = () => {
  const location = useLocation();
  const history = useHistory();
  const auth = useContext(UserContext);
  const { category } = location.state as LocationState;
  const [formData, setFormData] = useState<FormData>({
    category,
    question: `${category}질문`,
    answer: "",
    rate: "",
  });

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const question = await getQuestion(category);
      setFormData({ ...formData, question: question.title });
    }
    fetchData();
  }, [category]);
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { answer, rate } = formData;
    if (answer === "") {
      alert("대답을 입력해주세요");
    } else if (rate === "") {
      alert("질문 평가를 완료해주세요");
    } else {
      console.log(auth?.user);

      await submitAnswer(auth!!.user!!.uid, formData);
      history.push("/submit-done");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <header>{formData.question}</header>
      <textarea value={formData.answer} name="answer" onChange={handleChange} />
      <section>
        <span>오늘 질문은 어떠셨나요?</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            setFormData({ ...formData, rate: "good" });
          }}
          name="good"
        >
          좋았어요
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setFormData({ ...formData, rate: "bad" });
          }}
          name="bad"
        >
          아쉬워요
        </button>
      </section>
      <button>완료</button>
    </form>
  );
};
