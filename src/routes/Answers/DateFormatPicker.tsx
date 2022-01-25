import React, { SyntheticEvent, useState } from "react";
import styled from "styled-components";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ViewFormat } from "./Answers";

const Container = styled.ul`
  position: absolute;
  top: 12px;
  right: 48px;
`;
const DateFormat = styled.li`
  width: 44px;
  height: 26px;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  background-color: ${(props) => props.theme.palette.white};
  &:not(:first-child) {
    display: none;

    background-color: ${(props) => props.theme.palette.bgGrey2};
    margin-top: 2px;
  }
`;

const DateFormatIcon = styled.button`
  position: absolute;
  top: 0px;
  right: -30px;

  padding: 0;

  border: none;
  background-color: transparent;
`;

interface Props {
  viewFormat: ViewFormat;
  setViewFormat: React.Dispatch<React.SetStateAction<ViewFormat>>;
}

const DateFormatPicker: React.FC<Props> = ({ viewFormat, setViewFormat }) => {
  const [folded, setFolded] = useState<boolean>(true);

  const onClick = (e: SyntheticEvent) => {
    setFolded((currentState) => !currentState);
  };
  const onClickViewFormat = (e: SyntheticEvent) => {
    const vf = (e.target as HTMLButtonElement).name as ViewFormat;
    setViewFormat(vf);
    setFolded(true);
  };
  const viewFormats = { weekly: "주간", daily: "일간", monthly: "월간" };

  return (
    <Container>
      <DateFormat>{viewFormats[viewFormat]}</DateFormat>
      {Object.keys(viewFormats)
        .filter((key) => key !== viewFormat)
        .map((vf) => (
          <DateFormat key={vf} style={{ display: folded ? "none" : "flex" }}>
            <button name={vf} onClick={onClickViewFormat}>
              {viewFormats[vf]}
            </button>
          </DateFormat>
        ))}

      <DateFormatIcon onClick={onClick}>
        {folded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </DateFormatIcon>
    </Container>
  );
};

export default DateFormatPicker;
