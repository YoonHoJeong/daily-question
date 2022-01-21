import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #515fa9;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ServiceIcon = styled.img``;

const Buttons = styled.div`
  position: absolute;

  bottom: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {}

const UserAuthPage: React.FC<Props> = () => {
  const auth = useAuth();
  const history = useHistory();

  const moveToLogin = () => {
    history.push("/login");
  };
  const moveToRegister = () => {
    history.push("/register");
  };

  useEffect(() => {
    if (auth && auth.user) {
      history.push("/");
    }
  }, [auth, history]);

  return (
    <Container>
      <ServiceIcon src="logo.png" />

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

export default UserAuthPage;
