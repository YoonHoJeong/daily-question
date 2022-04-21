import moment from 'moment';
import styled from 'styled-components';

interface CellProps {
  cnt: number;
  active: boolean;
  date: string;
}

const Cell: React.FC<CellProps> = ({ cnt, active, date }) => {
  const bgColor = getBgColor(cnt, active);

  return (
    <ColoredCell bgColor={bgColor} active={active}>
      {moment(date).date()}
    </ColoredCell>
  );
};

const getBgColor = (cnt: number, active: boolean) => {
  if (active) {
    if (cnt === 0) {
      return 'grey100';
    } else if (cnt === 1) {
      return 'blue100';
    } else if (cnt === 2) {
      return 'blue200';
    } else {
      return 'blue300';
    }
  }
  return 'white';
};

const ColoredCell = styled('li')<{ bgColor: string; active: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;

  border: transparent;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px ${(props) => (props.active ? 'transparent' : props.theme.palette.grey400)} solid;
  color: ${(props) => (props.active ? props.theme.palette.white : props.theme.palette.grey400)};
  background-color: ${(props) => props.theme.palette[props.bgColor]};
`;

export default Cell;
