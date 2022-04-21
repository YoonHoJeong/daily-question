import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  bgColor?: string;
  large?: boolean;
  variant?: string;
  small?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => (props.large ? '300px' : '230px')};
  width: ${(props) => (props.small ? '178px' : '230px')};
  height: 45px;

  font-size: 14px;
  font-weight: bold;
  padding: 12px;
  outline: none;

  background-color: ${(props) => (props.bgColor === 'blue' ? props.theme.palette.blue : props.theme.palette.white)};
  color: ${(props) => (props.bgColor === 'blue' ? props.theme.palette.white : props.theme.palette.black)};

  border-radius: 50px;
  border: 1px solid;
  border-color: ${(props) => (props.bgColor === 'blue' ? 'transparent' : props.theme.palette.grey)};

  cursor: pointer;
`;

type ButtonType = 'contained' | 'outlined' | 'transparent';

interface Props {
  children: React.ReactNode;
  variant?: ButtonType;
  [x: string | number | symbol]: unknown;
}

const Button: React.FC<Props> = ({ children, ...args }) => {
  return <StyledButton {...args}>{children}</StyledButton>;
};

export default Button;
