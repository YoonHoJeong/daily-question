import { Button } from "@mui/material";
import React from "react";

interface Props {}

export const EnrollButton: React.FC<Props> = () => {
  return (
    <Button
      color="error"
      variant="outlined"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = "https://forms.gle/xQZwCNAQdYuAZnWD8";
      }}
    >
      11월 3주차 등록하기(~11.14)
    </Button>
  );
};
