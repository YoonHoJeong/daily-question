import React, { SyntheticEvent } from "react";
import styled from "styled-components";

interface Props {
  form: { isAnonymous?: boolean; isPublic?: boolean };
  onClickCheckbox: (e: SyntheticEvent) => void;
}

const AnswerOptionCheckBoxes: React.FC<Props> = ({
  form: { isPublic, isAnonymous },
  onClickCheckbox,
}) => {
  return (
    <Options>
      {isPublic && (
        <Option>
          <input
            type="checkbox"
            id="isAnonymous"
            name="isAnonymous"
            checked={isAnonymous}
            onClick={onClickCheckbox}
            onChange={() => {}}
          />
          <label htmlFor="isAnonymous">익명</label>
        </Option>
      )}
      <Option>
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          checked={isPublic}
          onClick={onClickCheckbox}
          onChange={() => {}}
        />
        <label htmlFor="isPublic">공개</label>
      </Option>
    </Options>
  );
};

export default AnswerOptionCheckBoxes;

const Options = styled.ul`
  width: 100%;
  display: flex;
  justify-content: end;

  & > li:not(:first-child) {
    margin-left: 19px;
  }

  margin-top: 2px;
`;
const Option = styled.li`
  display: flex;
  align-items: center;

  font-size: 12px;
`;
