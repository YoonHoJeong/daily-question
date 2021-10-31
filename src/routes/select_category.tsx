import React from "react";

interface Props {}

export const SelectCategory: React.FC<Props> = () => {
  return (
    <ul>
      <li>
        <button>자유</button>
      </li>
      <li>
        <button>관계</button>
      </li>
      <li>
        <button>직업</button>
      </li>
    </ul>
  );
};
