import React, { SyntheticEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { Header } from "../components/Header";
import Input from "../components/common/Input";
import BoxLogoGrey from "../assets/box_logo_grey.svg";
import Loader from "../components/common/Loader";
import { usePreloadImages } from "../hooks/usePreloadImages";
import { Spinner } from "../components/common/Spinner";

interface Props {}

const Login: React.FC<Props> = () => {
  const { form, onChange } = useForm({ email: "", password: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const auth = useAuth();
  const history = useHistory();
  const { loading } = usePreloadImages([BoxLogoGrey]);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    auth && (await auth.login(form.email, form.password));
    setSubmitting(false);
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
        {loading ? (
          <Loader />
        ) : (
          <LoginForm onSubmit={onSubmit}>
            <ServiceIcon src={BoxLogoGrey} />

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
          </LoginForm>
        )}

        {/* <Button large style={{ marginTop: "10px" }}>
          google 계정으로 로그인
        </Button> */}
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
  width: 85px;

  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  text-align: center;
  top: -130px;
`;
const LoginForm = styled.form`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Login;
