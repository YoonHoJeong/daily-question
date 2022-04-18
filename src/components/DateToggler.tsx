import styled from 'styled-components';
import { ArrowRightIcon, ArrowLeftIcon } from '../assets/icons';

interface Props {
  year?: number;
  month?: number;
  weekOfMonth?: number;
  onClickLeft: () => void;
  onClickRight: () => void;
}

const DateToggler: React.FC<Props> = ({ onClickLeft, onClickRight, ...props }) => {
  const { year, month, weekOfMonth } = props;

  return (
    <ToggleContainer>
      <Row>{year ? <YearText>{year}년</YearText> : null}</Row>
      <Row>
        <DateToggleButton onClick={onClickLeft}>
          <Icon src={ArrowLeftIcon} />
        </DateToggleButton>
        <MonthAndWeek>
          {month ? <li>{month}월</li> : null}
          {weekOfMonth ? <li>{weekOfMonth}주차</li> : null}
        </MonthAndWeek>
        <DateToggleButton right onClick={onClickRight}>
          <Icon src={ArrowRightIcon} />
        </DateToggleButton>
      </Row>
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div``;

const Icon = styled.img``;

const YearText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  display: flex;
  justify-content: center;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateToggleButton = styled.button<{ right?: boolean }>`
  height: 24px;
`;

const MonthAndWeek = styled.ul`
  width: 110px;

  display: flex;
  justify-content: center;

  font-weight: 500;
  font-size: 18px;
  line-height: 26px;

  & > li:last-child {
    margin-left: 5px;
  }
`;

export default DateToggler;
