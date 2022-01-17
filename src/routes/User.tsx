import React from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProfileContainer = styled.section`
  display: flex;
`;

const UserImg = styled.img`
  width: 65px;
  height: 65px;

  background-color: aquamarine;
  border-radius: 50%;
`;
const UserInfo = styled.div``;
const UserName = styled.section``;
const UserAddress = styled.section``;

const UserTabs = styled.ul`
  display: flex;
  justify-content: space-around;
`;
const UserTab = styled.li`
  display: flex;
  flex-direction: column;
`;
const UserTabIcon = styled.img`
  width: 50px;
  height: 50px;
  background-color: aquamarine;
  border-radius: 50%;
`;

const UserTabTitle = styled.span``;

interface Props {}

const User: React.FC<Props> = () => {
  const auth = useAuth();

  return (
    <div>
      <ProfileContainer>
        <UserImg src="" />
        <UserInfo>
          <UserName>{auth?.user?.name || "undefined"}</UserName>
          <UserAddress>
            {auth?.user?.email || "이메일을 등록해 주세요."}
          </UserAddress>
        </UserInfo>
      </ProfileContainer>
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
    </div>
  );
};

export default User;
