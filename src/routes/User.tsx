import React from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import BoxOpened from "../assets/box_opened.png";
import Heart from "../assets/4_heart.svg";
const Container = styled.div`
  width: 100vw;

  background-color: ${(props) => props.theme.palette.white};

  padding: 40px 25px;
  padding-bottom: 20px;
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
  height: 35px;
  margin-bottom: 5px;
`;

const UserTabTitle = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.black};
`;

interface Props {}

const User: React.FC<Props> = () => {
  const auth = useAuth();

  return (
    <Container>
      <UserProfile />
      <UserTabs>
        <UserTab>
          <Link to="/answers">
            <UserTabIcon src={BoxOpened} />
          </Link>
          <Link to="/answers">
            <UserTabTitle>나의 답변</UserTabTitle>
          </Link>
        </UserTab>
        <UserTab>
          <UserTabIcon src={Heart} />
          <UserTabTitle>마음함</UserTabTitle>
          {/* <Link to="/answers">
            <UserTabIcon src={Heart} />
          </Link>
          <Link to="/answers">
            <UserTabTitle>마음함</UserTabTitle>
          </Link> */}
        </UserTab>
      </UserTabs>
    </Container>
  );
};

export default User;
