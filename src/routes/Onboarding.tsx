import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import BoxLogoBlueLine from "../assets/box_blue_line.png";
import Loader from "../components/common/Loader";
import { usePreloadImages } from "../hooks/usePreloadImages";

interface Props {}

const Onboarding: React.FC<Props> = () => {
  const auth = useAuth();
  const history = useHistory();

  const moveToLogin = () => {
    history.push("/login");
  };
  const moveToRegister = () => {
    history.push("/register");
  };

  const { loading } = usePreloadImages([BoxLogoBlueLine]);

  useEffect(() => {
    if (auth && auth.user) {
      history.push("/");
    }
  }, [auth, history]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ServiceIcon src={BoxLogoBlueLine} />

          <Buttons>
            <Button type="submit" variant="contained" onClick={moveToLogin}>
              로그인하기
            </Button>
            <Button bgColor="blue" onClick={moveToRegister}>
              회원가입
            </Button>
          </Buttons>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #515fa9;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ServiceIcon = styled.img`
  height: 150px;

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

export default Onboarding;
