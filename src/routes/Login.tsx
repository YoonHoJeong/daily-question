import React, { SyntheticEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

const Container = styled.div``;
const ServiceIcon = styled.img``;
const ServiceTitle = styled.div``;
const LoginForm = styled.form``;

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
  }, [auth]);

  return (
    <Container>
      <ServiceIcon src="logo.png" />
      <ServiceTitle>1 Question 1 Day</ServiceTitle>
      <LoginForm onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" name="email" type="email" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={onChange}
          />
        </div>
        <Button type="submit" variant="contained">
          로그인
        </Button>
        <Button variant="contained">이전 화면으로</Button>
      </LoginForm>
    </Container>
  );
};

export default Login;
