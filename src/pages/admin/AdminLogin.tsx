import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

interface Props {}

const Container = styled.form`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AdminLogin: React.FC<Props> = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { form, onChange } = useForm({ email: "", password: "" });
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await auth?.login(form.email, form.password);
  };

  if (auth.user?.admin) {
    navigate("/dqadmin");
  }

  return (
    <Container onSubmit={onSubmit}>
      Admin Login
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
      <button type="submit">로그인</button>
    </Container>
  );
};

export default AdminLogin;
