import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

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

interface Props {}

const LoadScreen: React.FC<Props> = () => {
  return (
    <BackGround>
      <Spinner />
    </BackGround>
  );
};

export default LoadScreen;
