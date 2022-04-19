import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { ArrowUpIcon, ArrowDownIcon } from '../assets/icons';
import { RoutePath, useInternalRouter } from '../routes/useInternalRouter';

interface Props {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const ViewFormatPicker: React.FC<Props> = ({ top, bottom, left, right }) => {
  const [folded, setFolded] = useState<boolean>(true);
  const { params, replace } = useInternalRouter();
  const currentViewFormat = params['*'] || ('weekly' as RoutePath);

  const othersViewFormat = useMemo(
    () => Object.keys(viewFormatName).filter((key) => key !== currentViewFormat),
    [currentViewFormat]
  ) as RoutePath[];

  const toggleFold = (val: boolean) => () => {
    setFolded(val);
  };
  const navigateTo = (viewFormat: RoutePath) => () => {
    const close = toggleFold(true);
    close();
    replace(viewFormat);
  };

  return (
    <Container
      style={{
        ['--top' as any]: top,
        ['--bottom' as any]: bottom,
        ['--left' as any]: left,
        ['--right' as any]: right,
      }}
    >
      <DateFormatList>
        <CurrentDateFormat>{viewFormatName[currentViewFormat]}</CurrentDateFormat>
        {othersViewFormat.map((viewFormat) => (
          <DateFormatButton
            key={viewFormat}
            style={{ display: folded ? 'none' : 'flex' }}
            onClick={navigateTo(viewFormat)}
          >
            {viewFormatName[viewFormat]}
          </DateFormatButton>
        ))}
      </DateFormatList>

      <DateFormatToggleButton onClick={toggleFold(!folded)}>
        {folded ? <Icon src={ArrowDownIcon} /> : <Icon src={ArrowUpIcon} />}
      </DateFormatToggleButton>
    </Container>
  );
};

const viewFormatName = { weekly: '주간', daily: '일간', monthly: '월간' };

const Container = styled.div`
  position: absolute;
  display: flex;

  /* top: var(--top);
  bottom: var(--bottom);
  left: var(--left); */
  right: var(--right);

  & button {
    &:hover {
      cursor: pointer;
    }
  }
`;

const Icon = styled.img``;
const CurrentDateFormat = styled.button``;
const DateFormatList = styled.div`
  & > button {
    width: 44px;
    height: 26px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    font-size: 16px;
    padding: 4px 0px;
  }
  ${CurrentDateFormat} {
    background-color: ${(props) => props.theme.palette.white};
  }
`;

const DateFormatButton = styled.button`
  background-color: ${(props) => props.theme.palette.grey300};
`;

const DateFormatToggleButton = styled.button`
  height: 26px;
  padding: 0;

  display: flex;
  align-items: center;

  border: none;
  background-color: transparent;
`;

export default ViewFormatPicker;
