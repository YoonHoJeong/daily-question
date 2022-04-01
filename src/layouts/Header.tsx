import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import { VariablesContext } from "../App";
import sizes from "./sizes";

interface Props {
  transparent?: boolean;
}

const Header: React.FC<Props> = ({ transparent = false }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { pathnames } = useContext(VariablesContext);

  return (
    <Container transparent={transparent}>
      {!backDisabledRoutes.includes(pathname) && (
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
      <HeaderTitle>{pathnames[pathname]}</HeaderTitle>
    </Container>
  );
};

const backDisabledRoutes = [
  "/",
  "/board",
  "/user",
  "/answers",
  "/answers/daily",
  "/answers/weekly",
  "/answers/monthly",
];

const Container = styled.header<Props>`
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 99;

  width: 100%;
  height: ${sizes.header.height};

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.transparent ? "transparent" : "white")};
  border-bottom: 1px solid
    ${(props) => (props.transparent ? "transparent" : "rgba(0,0,0,0.075)")};

  padding-top: calc(constant(safe-area-inset-top));
  padding-top: calc(env(safe-area-inset-top));

  box-sizing: border-box;
`;

interface ButtonProps {
  position: string;
}
const ButtonContainer = styled.button<ButtonProps>`
  position: absolute;
  ${(props) => `${props.position}: 20px`};
  bottom: 15px;

  background-color: transparent;
  border: none;
  height: 22px;
`;

const HeaderTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export default Header;
