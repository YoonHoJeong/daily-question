import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {}
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid ${(props) => props.theme.palette.bgGrey2};
  border-right: 2px solid ${(props) => props.theme.palette.bgGrey2};
  border-bottom: 2px solid ${(props) => props.theme.palette.bgGrey2};
  border-left: 2px solid ${(props) => props.theme.palette.blue};
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Loader: React.FC<Props> = () => {
  return <Spinner />;
};

export default Loader;
