import { Button } from "@mui/material";
import React from "react";
import styles from "../styles.module.css";
interface Props {
  goBack: () => void;
}

export const MyAnswerButton: React.FC<Props> = ({ goBack }) => {
  return (
    <Button id="myanswer" className={styles.myAnswerBtn} onClick={goBack}>
      내 답변 보기
    </Button>
  );
};
