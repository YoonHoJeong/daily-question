import styled from "styled-components";
import { ArrowRightIcon, ArrowLeftIcon } from "../../assets/icons";
import { CustomDate } from "../../services/CustomDate";

interface Props {
  toggleType: "week" | "month";
  date: CustomDate;
  changeWeekOrMonth: (weekCnt: number) => void;
}

const WeekToggle: React.FC<Props> = ({
  toggleType,
  date,
  changeWeekOrMonth,
}) => {
  const [_, monthStr, weekStr] = date.weekString.replace("W", "-").split("-");

  return (
    <ToggleContainer>
      <WeekToggleButton onClick={() => changeWeekOrMonth(-1)}>
        <Icon src={ArrowLeftIcon} />
      </WeekToggleButton>
      <Week>
        <YearText>{date.year}년</YearText>
        {toggleType === "week"
          ? `${parseInt(monthStr)}월 
        ${parseInt(weekStr)}주차
        `
          : `${date.month}월`}
      </Week>
      <WeekToggleButton right onClick={() => changeWeekOrMonth(1)}>
        <Icon src={ArrowRightIcon} />
      </WeekToggleButton>
    </ToggleContainer>
  );
};

const Icon = styled.img``;

const YearText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  margin-bottom: 12px;
`;

const ToggleContainer = styled.ul`
  position: relative;
`;

const WeekToggleButton = styled.button<{ right?: boolean }>`
  position: absolute;
  bottom: -4px;
  ${(props) => (props.right ? "right: -35px" : "left: -35px")};
`;

const Week = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
`;

export default WeekToggle;
