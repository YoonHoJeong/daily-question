import React from 'react';
import styled from 'styled-components';
import { BoxClosedIcon, BoxOpenedIcon } from '../assets/icons';

interface Props {
  checked: boolean;
}

const DateCheckIcon: React.FC<Props> = ({ checked }) => {
  return (
    <li>
      <DateIcon src={checked ? BoxOpenedIcon : BoxClosedIcon} />
    </li>
  );
};

const DateIcon = styled.img`
  max-width: 46px;
  height: 46px;
`;

export default DateCheckIcon;
