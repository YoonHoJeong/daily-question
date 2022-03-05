import styled from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  date: {
    year: number;
    month: number;
    week?: number;
  };
  changeWeekOrMonth: (weekCnt: number) => void;
}

const WeekToggle: React.FC<Props> = ({
  date: { year, month, week },
  changeWeekOrMonth,
}) => {
  return (
    <ToggleContainer>
      <WeekToggleButton onClick={() => changeWeekOrMonth(-1)}>
        <KeyboardArrowLeftIcon />
      </WeekToggleButton>
      <Week>
        <YearText>{year}년</YearText>
        {month}월 {week ? week + "주차" : null}
      </Week>
      <WeekToggleButton right onClick={() => changeWeekOrMonth(1)}>
        <KeyboardArrowRightIcon />
      </WeekToggleButton>
    </ToggleContainer>
  );
};

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
