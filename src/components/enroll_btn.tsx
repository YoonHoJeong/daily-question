import { Button } from "@mui/material";
import React from "react";

interface Props {}

export const EnrollButton: React.FC<Props> = () => {
  return (
    <Button
      color="warning"
      variant="contained"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = "https://forms.gle/AqJ642yNG7pCwgYt7";
      }}
    >
      11월 2주차 등록하기
    </Button>
  );
};
