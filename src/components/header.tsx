import React from "react";
import styles from "../styles.module.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useHistory, useLocation } from "react-router";

interface Props {
  history: any;
}

export const Header: React.FC<Props> = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <header className={styles.header}>
      <IconButton
        aria-label="back"
        onClick={() => {
          if (location.pathname === "/today-question") {
            history.replace({
              pathname: "/select-category",
              state: {
                isKeywordsOn: true,
              },
            });
          } else {
            history.goBack();
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </header>
  );
};
