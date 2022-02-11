import styled from "styled-components";
import { CustomAuthError } from "../../hooks/useAuth";

const ErrorMessage: React.FC<{ error?: CustomAuthError }> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <ErrorText>{error.message}</ErrorText>;
};

const ErrorText = styled.p`
  position: absolute;
  bottom: -50px;

  width: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => props.theme.palette.red};
  white-space: pre-wrap;
`;

export default ErrorMessage;
