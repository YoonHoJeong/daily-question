import React from "react";
import styled from "styled-components";
import UserProfile from "../components/user/UserProfile";
import { useAuth } from "../hooks/useAuth";

interface Props {}

const User: React.FC<Props> = () => {
  return (
    <>
      <Container>
        <UserProfile />
      </Container>
      <UserMenues>
        <UserMenu>
          <LogOutButton />
        </UserMenu>
      </UserMenues>
    </>
  );
};

interface LogOutButtonProps {}

const LogOutButton: React.FC<LogOutButtonProps> = () => {
  const auth = useAuth();

  return <Button onClick={auth.logout}>로그아웃</Button>;
};

const Container = styled.div`
  width: 100vw;

  background-color: ${(props) => props.theme.palette.white};

  padding: 40px 25px;
`;

const UserMenues = styled.ul`
  width: 100%;
`;

const UserMenu = styled.li`
  width: 100%;
  background-color: white;

  margin-top: 4px;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  padding: 13px 31px;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export default User;
