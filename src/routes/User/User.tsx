import React from "react";
import styled from "styled-components";
import UserProfile from "../../components/UserProfile";
import BoxOpened from "../../assets/box_opened.png";
import UserIcon from "../../assets/person2.png";
import Heart from "../../assets/4_heart.svg";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../hooks/useAuth";
import { usePreloadImages } from "../../hooks/usePreloadImages";

interface Props {}

const User: React.FC<Props> = () => {
  const { loading } = usePreloadImages([UserIcon, BoxOpened, Heart]);

  if (loading) {
    return <Loader />;
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
  const confirmMessage = "로그아웃 하시겠어요?";
  const handleLogout = () => {
    const response = window.confirm(confirmMessage);
    if (response === true) {
      auth.logout();
    }
  };

  return <Button onClick={handleLogout}>로그아웃</Button>;
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
