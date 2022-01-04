import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const ServiceIcon = styled.img``;
const ServiceTitle = styled.div``;
const LoginButtonContainer = styled.div``;
const Container = styled.div``;

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <Container>
      <ServiceIcon src="logo.png" />
      <ServiceTitle>1 Question 1 Day</ServiceTitle>
      <LoginButtonContainer>
        <Button variant="contained">이메일 로그인</Button>
        <Button variant="contained">휴대폰 로그인</Button>
        <input type="email" />
        <input type="text" />
        <Button variant="contained">로그인</Button>
        <Button variant="contained">이전 화면으로</Button>
      </LoginButtonContainer>
    </Container>
  );
};

export default Login;
