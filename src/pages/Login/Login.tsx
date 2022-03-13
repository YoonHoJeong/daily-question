import React, { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CustomAuthError, useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
// import { usePreloadImages } from "../../hooks/usePreloadImages";

import Header from "../../layouts/Header";
import {
  Input,
  Button,
  LoadScreen,
  Spinner,
  ErrorMessage,
} from "../../components/common";

import BoxLogoGreyLogo from "../../assets/icons/box/opened_gray_bg.svg";

interface Props {}

const Login: React.FC<Props> = () => {
  const { form, onChange } = useForm({ email: "", password: "" });
  const [error, setError] = useState<CustomAuthError>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const auth = useAuth();
  const history = useHistory();
  // const { loading } = usePreloadImages([BoxLogoGreyLogo]);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    const response = await auth.login(form.email, form.password);
    setError(response?.error);
    if (response?.error) {
      setSubmitting(false);
    }
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
          <ServiceIcon src={BoxLogoGreyLogo} />

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일"
            onChange={onChange}
            disabled={submitting}
          />
          <Input
            id="password"
            name="password"
            type="password"
            onChange={onChange}
            placeholder="비밀번호"
            style={{ marginTop: "10px" }}
            disabled={submitting}
          />
          {/* <input id="autoLogin" type="checkBox" checked />
          <label htmlFor="autoLogin">자동 로그인</label> */}
          <Button
            large
            bgColor="blue"
            type="submit"
            variant="contained"
            style={{ marginTop: "35px" }}
            disabled={submitting}
          >
            {submitting ? <Spinner /> : "로그인"}
          </Button>
          <ErrorMessage error={error} />
        </LoginForm>
      </Container>
    </>
  );
};

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
  width: 128px;

  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  text-align: center;
  top: -150px;
`;
const LoginForm = styled.form`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Login;
