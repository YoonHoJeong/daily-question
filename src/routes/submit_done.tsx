import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import styles from "../styles.module.css";

interface Props {}

export const SubmitDone: React.FC<Props> = () => {
  const [rate, setRate] = useState<string>("");

  return (
    <div className={styles.ct}>
      <Box className={styles.rates}>
        <Typography
          variant="h6"
          align="center"
          className={`${rate !== "" ? `${styles.hide}` : null}`}
        >
          오늘 질문은 어떠셨나요?
        </Typography>
        <Box
          className={`${styles.rateBtnBox} ${
            rate !== "" ? `${styles.hide}` : null
          }`}
        >
          <Button
            className={styles.rateBtn}
            variant={rate === "good" ? "contained" : "outlined"}
            onClick={(e) => {
              e.preventDefault();
              setRate("good");
            }}
            name="good"
          >
            좋았어요
          </Button>
          <Button
            className={styles.rateBtn}
            variant={rate === "bad" ? "contained" : "outlined"}
            onClick={(e) => {
              e.preventDefault();
              setRate("bad");
            }}
            color="error"
            name="bad"
          >
            아쉬워요
          </Button>
        </Box>
      </Box>
      <Typography variant="h6" align="center">
        내일 질문도 기대해주세요 😘
      </Typography>
    </div>
  );
};
