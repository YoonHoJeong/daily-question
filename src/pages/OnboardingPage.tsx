import React, { useEffect } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";

import BoxBlueLineLogo from "../assets/icons/box/opened_white_bg.svg";
import { useInternalRouter } from "../routes/useInternalRouter";

interface Props {}

const OnboardingPage: React.FC<Props> = () => {
  const auth = useAuth();
  const { push } = useInternalRouter();

  const moveToLogin = () => {
    push("/login");
  };
  const moveToRegister = () => {
    push("/register");
  };

  useEffect(() => {
    if (auth && auth.user) {
      push("/");
    }
  }, [auth, push]);

  return (
    <Container>
      <ServiceIcon src={BoxBlueLineLogo} />

      <Buttons>
        <Button type="submit" variant="contained" onClick={moveToLogin}>
          로그인하기
        </Button>
        <Button bgColor="blue" onClick={moveToRegister}>
          회원가입
        </Button>
      </Buttons>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => props.theme.palette.blue};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ServiceIcon = styled.img`
  height: 256px;

  position: relative;
  top: -30px;
`;

const Buttons = styled.div`
  position: absolute;

  bottom: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default OnboardingPage;
