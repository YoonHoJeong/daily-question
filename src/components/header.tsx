import React from "react";
import { useHistory } from "react-router";
import styles from "../styles.module.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";

interface Props {
  history: any;
}

export const Header: React.FC<Props> = ({ history }) => {
  return (
    <header className={styles.header}>
      <IconButton
        aria-label="back"
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Button
        variant="contained"
        color="success"
        className={styles.myAnswerBtn}
        onClick={() => {
          history.push("/my-answers");
        }}
      >
        내 답변 보기
      </Button>
    </header>
  );
};
