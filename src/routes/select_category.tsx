import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { gaLog } from "../services/firebase";
import styles from "../styles.module.css";

const todayKeywords = ["카페", "부모님", "소통"];

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  const [category, setCategory] = useState<string>();
  const history = useHistory();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const element = e.target as HTMLInputElement;
    setCategory(element.name);
    history.push({
      pathname: "/today-question",
      state: { category: element.name },
    });
  };
  useEffect(() => {
    gaLog("select_category_visited");
  }, []);
  return (
    <div className={styles.ct}>
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
      <>답해보고 싶은 키워드를 골라주세요 🤔</>
      <ul className={styles.categoryContainer}>
        {todayKeywords.map((keyword) => (
          <li key={keyword}>
            <IconButton name={keyword} onClick={handleClick}>
              {keyword}
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};
