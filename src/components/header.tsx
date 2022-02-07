import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface ButtonProps {
  position: string;
}

const Container = styled.header<Props>`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;

  width: 100%;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: ${(props) => (props.transparent ? "transparent" : "white")};
  border-bottom: 1px solid
    ${(props) => (props.transparent ? "transparent" : "rgba(0,0,0,0.075)")};

  box-sizing: border-box;
`;

const ButtonContainer = styled.button<ButtonProps>`
  position: absolute;
  ${(props) => `${props.position}: 20px`};
  bottom: 15px;

  background-color: transparent;
  border: none;
  height: 22px;
`;

const HeaderTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const HeaderName = (pathname: string) => {
  switch (pathname) {
    case "/":
    case "/submit-done":
      return "오늘의 질문";
    case "/user":
      return "내 정보";
    case "/answers":
      return "나의 답변";
    case "/board":
      return "게시판";
    default:
      if (pathname.includes("/question")) {
        return "오늘의 질문";
      }
      return "";
  }
};

const backDisabledRoutes = ["/", "/board", "/user"];

interface Props {
  transparent?: boolean;
}

export const Header: React.FC<Props> = ({ transparent = false }) => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  return (
    <Container transparent={transparent}>
      {!backDisabledRoutes.includes(location.pathname) && (
        <ButtonContainer
          position="left"
          aria-label="back"
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIcon sx={{ width: 22, height: 22 }} />
        </ButtonContainer>
      )}
      <HeaderTitle>{HeaderName(location.pathname)}</HeaderTitle>

      {auth?.user && (
        <ButtonContainer
          position="right"
          aria-label="profile"
          onClick={() => {
            auth?.logout();
          }}
        >
          로그아웃
          {/* <PersonOutline sx={{ width: 22, height: 22 }} /> */}
        </ButtonContainer>
      )}
    </Container>
  );
};
