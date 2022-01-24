import React, { SyntheticEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/useAuth";
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

const Register: React.FC<Props> = () => {
  const auth = useAuth();
  const history = useHistory();

  const { form, onChange } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    Object.keys(form).forEach((key) => {
      switch (key) {
        case "name":
          // 동일한 닉네임 확인
          break;
        case "email":
          // 동일한 이메일 확인
          break;
        case "password":
          // 7자 이상
          break;
        case "password2":
          // password 1과 같은지?
          if (form["password"] !== form[key]) {
            alert("비밀번호와 비밀번호 확인이 같은지 확인해주세요.");
          }
          break;
      }
    });
    delete form["password2"];
    await auth?.register(form);
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
            required
            name="name"
            onChange={onChange}
            type="text"
            placeholder="닉네임"
            style={{ marginBottom: "10px" }}
          />
          <Input
            required
            name="email"
            onChange={onChange}
            type="email"
            placeholder="이메일"
            style={{ marginBottom: "10px" }}
          />
          <Input
            required
            name="password"
            onChange={onChange}
            type="password"
            placeholder="비밀번호"
            style={{ marginBottom: "10px" }}
          />
          <Input
            required
            name="password2"
            onChange={onChange}
            type="password"
            placeholder="비밀번호 확인"
          />

          <Button bgColor="blue" large style={{ marginTop: "20px" }}>
            가입하기
          </Button>
        </RegisterForm>
        <Button large style={{ marginTop: "10px" }}>
          google 계정으로 가입하기
        </Button>
      </Container>
    </>
  );
};

export default Register;