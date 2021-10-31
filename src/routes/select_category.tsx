import React, { useState } from "react";
import { useHistory } from "react-router";

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  const [category, setCategory] = useState<string>();
  const history = useHistory();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const element = e.target as HTMLInputElement;
    setCategory(element.name);
    // console.log((<HTMLInputElement>e.target).value);
  };

  return (
    <>
      <ul>
        <li>
          <button name="자유" onClick={handleClick}>
            자유
          </button>
        </li>
        <li>
          <button name="관계" onClick={handleClick}>
            관계
          </button>
        </li>
        <li>
          <button name="직업" onClick={handleClick}>
            직업
          </button>
        </li>
      </ul>
      <button
        onClick={() => {
          if (category === undefined) {
            alert("no input");
          } else {
            history.push({ pathname: "/today-question", state: { category } });
          }
        }}
      >
        Next
      </button>
    </>
  );
};
