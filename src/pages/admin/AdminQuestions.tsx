import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import QuestionItem from "../../components/QuestionItem";
import { useForm } from "../../hooks/useForm";
import { getToday } from "../../services/DateManager";
import AdminApi, { QuestionInputsForm } from "../../services/AdminApi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
import {
  QuestionsDataModel,
  QuestionDataModel,
} from "../../model/QuestionModels";

interface Props {}

const AdminQuestions: React.FC<Props> = () => {
  const [questions, setQuestions] = useState<QuestionsDataModel>({});
  const [currentDate, setCurrentDate] = useState(getToday());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const {
    form: formInputs,
    setForm,
    onChange,
    reset: formReset,
  } = useForm<QuestionInputsForm>({
    keyword: "",
    question: "",
    publish_date: currentDate,
  });

  const [open, setOpen] = React.useState(false);

  const onPopupOpen = () => {
    setOpen(true);
  };
  const onPopupClose = () => {
    formReset();
    setOpen(false);
  };

  const onDateChange = (e: SyntheticEvent) =>
    setCurrentDate((e.target as HTMLInputElement).value);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (formInputs.qid) {
        await AdminApi.question.update(formInputs.qid, formInputs);
      } else {
        await AdminApi.question.enroll(formInputs);
      }
      window.confirm("완료되었습니다.");
      onPopupClose();

      fetchData();
    } catch (e: any) {
      console.log(e);

      setError(e);
    } finally {
      formReset();

      setLoading(false);
    }
  };

  const onQuestionEdit = ({
    question,
    keyword,
    qid,
    publish_date,
  }: QuestionDataModel) => {
    setForm({ qid, question, keyword, publish_date });
    setOpen(true);
  };

  const onQuestionDelete = async (qid: string) => {
    const res = window.confirm("정말 삭제하시겠습니까?");

    if (res) {
      setLoading(true);
      await AdminApi.question.delete(qid);
      await fetchData();
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    const questions = await AdminApi.question.getfilteredByDate(currentDate);
    setQuestions(questions);
    setLoading(false);
  }, [currentDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <>404</>;
  }

  return (
    <div>
      <QuestionsViewer
        loading={loading}
        questions={questions}
        date={currentDate}
        onDateChange={onDateChange}
        onQuestionDelete={onQuestionDelete}
        onQuestionEdit={onQuestionEdit}
      />

      <Button variant="contained" onClick={onPopupOpen}>
        질문 등록
      </Button>
      <QuestionPopupForm
        open={open}
        onPopupClose={onPopupClose}
        onSubmit={onSubmit}
        formInputs={formInputs}
        onInputChange={onChange}
      />
    </div>
  );
};

export default AdminQuestions;

interface QuestionsProps {
  loading: boolean;
  questions: QuestionsDataModel;
  date: string;
  onDateChange: (e: SyntheticEvent) => void;
  onQuestionDelete: (qid: string) => Promise<void>;
  onQuestionEdit: (question: QuestionDataModel) => void;
}

const QuestionsViewer: React.FC<QuestionsProps> = ({
  loading,
  questions,
  date,
  onDateChange,
  onQuestionDelete,
  onQuestionEdit,
}) => {
  if (loading) {
    return <>loading...</>;
  }

  return (
    <>
      <input type="date" defaultValue={date} onChange={onDateChange} />
      <TodayQuestions>
        {Object.keys(questions).length > 0 ? (
          Object.keys(questions).map((qid) => (
            <QuestionItem
              key={qid}
              question={questions[qid]}
              onQuestionDelete={onQuestionDelete}
              onQuestionEdit={onQuestionEdit}
            />
          ))
        ) : (
          <span>등록된 질문이 없습니다.</span>
        )}
      </TodayQuestions>
    </>
  );
};

const TodayQuestions = styled.ul``;

interface QuestionPopupFormProps {
  open: boolean;
  onPopupClose: () => void;
  formInputs: QuestionInputsForm;
  onSubmit: (e: SyntheticEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const QuestionPopupForm: React.FC<QuestionPopupFormProps> = React.memo(
  ({
    open,
    onPopupClose: handlePopupClose,
    formInputs,
    onSubmit,
    onInputChange,
  }) => {
    return (
      <Dialog open={open} onClose={handlePopupClose}>
        <DialogTitle>질문 추가/수정</DialogTitle>
        <DialogContent>
          <Input
            name="publish_date"
            type="date"
            value={formInputs.publish_date}
            onChange={onInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="keyword"
            name="keyword"
            label="키워드"
            type="text"
            fullWidth
            onChange={onInputChange}
            value={formInputs.keyword}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="question"
            name="question"
            label="질문"
            type="text"
            fullWidth
            onChange={onInputChange}
            value={formInputs.question}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onSubmit}>
            제출하기
          </Button>
          <Button onClick={handlePopupClose}>취소하기</Button>
        </DialogActions>
      </Dialog>
    );
  }
);
