import React from "react";
import styles from "../styles.module.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useHistory, useLocation } from "react-router";

interface Props {}

export const Header: React.FC<Props> = () => {
  const history = useHistory();
  const location = useLocation();

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
