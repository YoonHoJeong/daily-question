import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { AdminHeader } from "../components/admin_header";
import { adminApi } from "../services/adminApi";
import styles from "../styles.module.css";

interface Props {}

export interface QuestionForm {
  keyword: string;
  publish_date: string;
  question: string;
}

export const EnrollQuestion: React.FC<Props> = () => {
  const [formData, setFormData] = useState<QuestionForm>({
    keyword: "",
    publish_date: "",
    question: "",
  });

  const isFormValid = () => {
    const { keyword, publish_date, question } = formData;
    if (keyword === "" || publish_date === "" || question === "") {
      return false;
    }
    return true;
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(formData);

    if (isFormValid()) {
      try {
        await adminApi.enrollQuestion(formData);
        alert(
          `keyword: ${formData.keyword} \npublish_date: ${formData.publish_date} \nquestion: ${formData.question} \n 질문 등록에 성공했습니다.`
        );
        setFormData({ keyword: "", publish_date: "", question: "" });
      } catch (e) {
        alert("질문 등록에 실패했습니다.");
      }
    } else {
      alert("입력된 값들을 확인해 주세요.");
    }
  };

  return (
    <>
      <AdminHeader />
      <form
        className={styles.questionEnrollForm}
        action=""
        onSubmit={handleSubmit}
      >
        <TextField
          value={formData?.keyword}
          required
          label="keyword"
          name="keyword"
          onChange={handleChange}
        />
        <TextField
          required
          type="date"
          name="publish_date"
          value={formData?.publish_date}
          onChange={handleChange}
        />
        <TextField
          required
          value={formData?.question}
          label="question"
          name="question"
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          질문 등록
        </Button>
      </form>
    </>
  );
};
