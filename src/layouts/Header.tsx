import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import { VariablesContext } from "../../App";

const backDisabledRoutes = [
  "/",
  "/board",
  "/user",
  "/answers",
  "/answers/daily",
  "/answers/weekly",
  "/answers/monthly",
];

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

const Container = styled.header<Props>`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;

  width: 100%;
  min-height: 61px;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: ${(props) => (props.transparent ? "transparent" : "white")};
  border-bottom: 1px solid
    ${(props) => (props.transparent ? "transparent" : "rgba(0,0,0,0.075)")};

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
  font-size: 20px;
  font-weight: bold;
`;

export default Header;
