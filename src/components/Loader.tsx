import React from "react";
import styled, { keyframes } from "styled-components";

const BackGround = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: center;
  align-items: center;
`;

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

interface Props {}

const Loader: React.FC<Props> = () => {
  return (
    <BackGround>
      <Spinner />
    </BackGround>
  );
};

export default Loader;
