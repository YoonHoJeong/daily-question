import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link, useLocation } from "react-router-dom";

interface Props {}

const viewFormats = { weekly: "주간", daily: "일간", monthly: "월간" };
function getAnswerFormatFromPath(pathname: string) {
  const viewFormatsWithPathname = {
    "/answers": "weekly",
    "/answers/weekly": "weekly",
    "/answers/daily": "daily",
    "/answers/monthly": "monthly",
  };

  return viewFormatsWithPathname[pathname];
}

const DateFormatPicker: React.FC<Props> = () => {
  const [folded, setFolded] = useState<boolean>(true);

  const { pathname } = useLocation();
  const currentViewFormat = getAnswerFormatFromPath(pathname);

  useEffect(() => {
    setFolded(true);
  }, [pathname]);

  const onClick = (e: SyntheticEvent) => {
    setFolded((currentState) => !currentState);
  };

  return (
    <Container>
      <CurrentDateFormat>{viewFormats[currentViewFormat]}</CurrentDateFormat>
      {Object.keys(viewFormats)
        .filter((key) => key !== currentViewFormat)
        .map((viewFormat) => (
          <DateFormat
            key={viewFormat}
            style={{ display: folded ? "none" : "flex" }}
          >
            <Link to={`/answers/${viewFormat}`}>{viewFormats[viewFormat]}</Link>
          </DateFormat>
        ))}

      <DateFormatIcon onClick={onClick}>
        {folded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </DateFormatIcon>
    </Container>
  );
};

const Container = styled.ul`
  position: absolute;
  top: 12px;
  right: 48px;

  & > li {
    width: 44px;
    height: 26px;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    font-weight: 500;
    font-size: 16px;
    padding: 4px 0px;
  }
`;

const CurrentDateFormat = styled.li`
  display: none;
  background-color: ${(props) => props.theme.palette.white};
  margin-top: 2px;
`;
const DateFormat = styled.li`
  background-color: ${(props) => props.theme.palette.bgGrey2};
`;

const DateFormatIcon = styled.button`
  position: absolute;
  top: 0px;
  right: -30px;

  padding: 0;

  border: none;
  background-color: transparent;
`;

export default DateFormatPicker;
