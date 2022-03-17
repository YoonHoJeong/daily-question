import { getAllQuestions } from "./../../services/QuestionApi";
import { useQuery } from "react-query";
import { QuestionsDataModel } from "../../model/QuestionModels";

export const useFetchQuestions = () =>
  useQuery<QuestionsDataModel>("questions", getAllQuestions);
