import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  background-color: ${(props) => props.color};
`;

type ButtonType = "contained" | "outlined";

interface Props {
  children: React.ReactNode;
  variant?: ButtonType;
  [x: string | number | symbol]: unknown;
}

const Button: React.FC<Props> = ({ children, ...args }) => {
  return <StyledButton {...args}>{children}</StyledButton>;
};

export default Button;
