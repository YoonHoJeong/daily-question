import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { Header } from "../components/Header";
import { CustomAuthError, useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

interface Props {}

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #f2f2f2;
`;
const MainTitle = styled.p`
  font-weight: bold;
  font-size: 20px;
`;
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;
const ErrorMsg = styled.p`
  color: ${(props) => props.theme.palette.blue};
  font-size: 12px;
`;

const Register: React.FC<Props> = () => {
  const auth = useAuth();
  const history = useHistory();

  const { form, onChange } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<CustomAuthError | null>();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    const response = await auth!!.register(form);
    if (response.status === true) {
      // user register success
    } else {
      // user register fail
      response.error && alert(response.error.message);
      // setError(response.error);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (auth && auth.user) {
      history.push("/");
    }
  }, [auth, history]);

  return (
    <>
      <Header transparent={true} />
      <Container>
        <MainTitle>회원가입</MainTitle>
        <RegisterForm onSubmit={onSubmit}>
          <Input
            disabled={submitting}
            required
            name="name"
            onChange={onChange}
            type="text"
            placeholder="닉네임"
            style={{ marginBottom: "10px" }}
          />
          <Input
            disabled={submitting}
            required
            name="email"
            onChange={onChange}
            type="email"
            placeholder="이메일"
            style={{ marginBottom: "10px" }}
          />
          <Input
            disabled={submitting}
            required
            name="password"
            onChange={onChange}
            type="password"
            placeholder="비밀번호"
            style={{ marginBottom: "10px" }}
          />

          <Input
            disabled={submitting}
            required
            name="password2"
            onChange={onChange}
            type="password"
            placeholder="비밀번호 확인"
          />

          <Button
            bgColor="blue"
            large
            style={{ marginTop: "20px" }}
            disabled={submitting}
          >
            가입하기
          </Button>
        </RegisterForm>
        <Button large style={{ marginTop: "10px" }} disabled={submitting}>
          google 계정으로 가입하기
        </Button>
      </Container>
    </>
  );
};

export default Register;
