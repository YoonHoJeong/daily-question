import React from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";

const Container = styled.div`
  width: 100vw;

  background-color: ${(props) => props.theme.palette.white};
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
  width: 40px;
  height: 40px;
  background-color: lightgrey;
`;

const UserTabTitle = styled.span`
  margin-top: 8px;
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
            <UserTabIcon />
          </Link>
          <Link to="/answers">
            <UserTabTitle>나의 답변</UserTabTitle>
          </Link>
        </UserTab>
        <UserTab>
          <Link to="/answers">
            <UserTabIcon />
          </Link>
          <Link to="/answers">
            <UserTabTitle>마음함</UserTabTitle>
          </Link>
        </UserTab>
      </UserTabs>
    </Container>
  );
};

export default User;
