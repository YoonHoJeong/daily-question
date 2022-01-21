import React, { SyntheticEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { Header } from "../components/Header";
import Input from "../components/common/Input";

const Container = styled.div`
  background-color: #f2f2f2;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ServiceIcon = styled.img`
  width: 85px;

  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  text-align: center;
  top: -110px;
`;
const LoginForm = styled.form`
  position: relative;

  display: flex;
  flex-direction: column;
`;

interface Props {}

const Login: React.FC<Props> = () => {
  const { form, onChange } = useForm({ email: "", password: "" });
  const auth = useAuth();
  const history = useHistory();
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    auth && (await auth.login(form.email, form.password));
  };
  useEffect(() => {
    if (auth && auth.user) {
      history.push("/");
    }
  }, [auth, history]);

  return (
    <>
      <Header transparent />
      <Container>
        <LoginForm onSubmit={onSubmit}>
          <ServiceIcon src="logo.png" />

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일"
            onChange={onChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            onChange={onChange}
            placeholder="비밀번호"
            style={{ marginTop: "10px" }}
          />
          {/* <input id="autoLogin" type="checkBox" checked />
          <label htmlFor="autoLogin">자동 로그인</label> */}
          <Button
            large
            bgColor="blue"
            type="submit"
            variant="contained"
            style={{ marginTop: "35px" }}
          >
            {auth?.isAuthenticating ? "로그인 중" : "로그인"}
          </Button>
        </LoginForm>
        <Button large style={{ marginTop: "10px" }}>
          google 계정으로 로그인
        </Button>
      </Container>
    </>
  );
};

export default Login;
