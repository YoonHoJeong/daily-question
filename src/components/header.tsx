import React from "react";
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
    </header>
  );
};
