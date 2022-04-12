import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";

import { ArrowUpIcon, ArrowDownIcon } from "../assets/icons";
import { Link, useLocation } from "react-router-dom";

interface Props {}

const DateFormatPicker: React.FC<Props> = () => {
  const [folded, setFolded] = useState<boolean>(true);

  const { pathname } = useLocation();
  const currentViewFormat = getAnswerFormatFromPath(pathname);
  const othersViewFormat = Object.keys(viewFormats).filter(
    (key) => key !== currentViewFormat
  );

  useEffect(() => {
    setFolded(true);
  }, [pathname]);

  const onClick = (e: SyntheticEvent) => {
    setFolded((currentState) => !currentState);
  };

  return (
    <Container>
      <DateFormatList>
        <CurrentDateFormat>{viewFormats[currentViewFormat]}</CurrentDateFormat>
        {othersViewFormat.map((viewFormat) => (
          <DateFormat
            key={viewFormat}
            style={{ display: folded ? "none" : "flex" }}
          >
            <Link to={`/answers/${viewFormat}`}>{viewFormats[viewFormat]}</Link>
          </DateFormat>
        ))}
      </DateFormatList>

      <DateFormatToggleButton onClick={onClick}>
        {folded ? <Icon src={ArrowDownIcon} /> : <Icon src={ArrowUpIcon} />}
      </DateFormatToggleButton>
    </Container>
  );
};

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

const Container = styled.div`
  position: absolute;
  top: 12px;
  right: 40px;
  z-index: 100;
`;

const Icon = styled.img``;
const DateFormatList = styled.ul`
  & > li {
    width: 44px;
    height: 26px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    font-size: 16px;
    padding: 4px 0px;
  }
`;

const CurrentDateFormat = styled.li`
  display: none;
  background-color: ${(props) => props.theme.palette.white};
`;
const DateFormat = styled.li`
  background-color: ${(props) => props.theme.palette.bgGrey2};
`;

const DateFormatToggleButton = styled.button`
  position: absolute;
  top: 0px;
  right: -24px;

  height: 26px;
  padding: 0;

  display: flex;
  align-items: center;

  border: none;
  background-color: transparent;
`;

export default DateFormatPicker;
