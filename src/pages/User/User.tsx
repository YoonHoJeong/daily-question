import React from "react";
import styled from "styled-components";
import UserProfile from "../../components/user/UserProfile";
import LoadScreen from "../../components/common/LoadScreen";
import { useAuth } from "../../hooks/useAuth";

import { usePreloadImages } from "../../hooks/usePreloadImages";
import BoxOpenedIcon from "../../assets/icons/box_opened.png";
import UserIcon from "../../assets/icons/person_gray.png";

interface Props {}

const User: React.FC<Props> = () => {
  const { loading } = usePreloadImages([UserIcon, BoxOpenedIcon]);

  if (loading) {
    return <LoadScreen />;
  }

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
