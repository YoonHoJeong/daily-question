import React from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;

  background-color: ${(props) => props.theme.palette.white};
  padding-bottom: 20px;
`;
const ProfileContainer = styled.section`
  display: flex;
  padding: 0px 25px;
  padding-top: 40px;

  width: 100%;
`;

const UserImg = styled.img`
  width: 60px;
  height: 60px;

  background-color: ${(props) => props.theme.palette.grey};
  border-radius: 50%;
`;
const UserInfo = styled.div`
  width: 100%;
  height: 60px;
  margin-left: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const UserName = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.black};
`;

const UserAddress = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.black};
`;
const UserIntro = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.black};
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
      <ProfileContainer>
        <UserImg src="" />
        <UserInfo>
          <UserName>{auth?.user?.name || "undefined"}</UserName>
          <UserAddress>
            {auth?.user?.email || "이메일을 등록해 주세요."}
          </UserAddress>
          <UserIntro>힙하고 싶으면 힙해질 수 없음</UserIntro>
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
    </Container>
  );
};

export default User;
