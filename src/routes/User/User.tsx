import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "../../components/UserProfile";
import BoxOpened from "../../assets/box_opened.png";
import UserIcon from "../../assets/person2.png";
import Heart from "../../assets/4_heart.svg";
import Loader from "../../components/common/Loader";
import { VariablesContext } from "../../App";
import { useAuth } from "../../hooks/useAuth";
import { usePreloadImages } from "../../hooks/usePreloadImages";

interface Props {}

const LogOutButton: React.FC<Props> = () => {
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
const User: React.FC<Props> = () => {
  const { loading } = usePreloadImages([UserIcon, BoxOpened, Heart]);
  const globalVariables = useContext(VariablesContext);
  const { pathname } = useLocation();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <UserProfile />
        {/* <UserTabs>
          <UserTab>
            <Link to="/answers">
              <UserTabIcon src={BoxOpened} />
            </Link>
            <Link to="/answers">
              <UserTabTitle>{globalVariables.myAnswers}</UserTabTitle>
            </Link>
          </UserTab>
          <UserTab>
            <Link to={`${pathname}/keeps`}>
              <UserTabIcon src={Heart} />
            </Link>
            <Link to={`${pathname}/keeps`}>
              <UserTabTitle>{globalVariables.keeps}</UserTabTitle>
            </Link>
          </UserTab>
        </UserTabs> */}
      </Container>
      <UserMenues>
        <UserMenu>
          <LogOutButton />
        </UserMenu>
      </UserMenues>
    </>
  );
};

const Container = styled.div`
  width: 100vw;

  background-color: ${(props) => props.theme.palette.white};

  padding: 40px 25px;
`;

const UserTabs = styled.ul`
  display: flex;
  justify-content: space-around;

  margin-top: 30px;
`;
const UserTab = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserTabIcon = styled.img`
  max-width: 45px;
  height: 31px;
  margin-bottom: 5px;
`;

const UserTabTitle = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.black};
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
