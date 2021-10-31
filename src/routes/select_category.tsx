import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { gaLog } from "../services/firebase";
import styles from "../styles.module.css";
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
  });
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
      <>원하는 카테고리를 선택해주세요.</>
      <ul className={styles.categoryContainer}>
        <li>
          <Button variant="outlined" name="자유" onClick={handleClick}>
            자유
          </Button>
        </li>
        <li>
          <Button variant="outlined" name="관계" onClick={handleClick}>
            관계
          </Button>
        </li>
        <li>
          <Button variant="outlined" name="직업" onClick={handleClick}>
            직업
          </Button>
        </li>
      </ul>
    </div>
  );
};
