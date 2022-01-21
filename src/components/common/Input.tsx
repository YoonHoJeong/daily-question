import styled from "styled-components";

const Input = styled.input`
  width: 300px;
  height: 45px;
  background-color: white;
  border: 1px solid #cccccc;
  font-size: 16px;
  padding: 12px 15px;

  &::placeholder {
    color: #cccccc;
  }
`;

export default Input;
