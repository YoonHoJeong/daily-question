import React from "react";
import styled from "styled-components";
import { Auth, useAuth } from "../hooks/useAuth";
import PersonGrey from "../assets/person2.png";

const ProfileContainer = styled.section`
  display: flex;

  width: 100%;
`;
const UserImg = styled.img`
  width: 60px;
  height: 60px;
  padding: 12px;

  background-color: ${(props) => props.theme.palette.bgGrey2};
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
interface Props {}

const UserProfile: React.FC<Props> = () => {
  const auth = useAuth();

  return (
    <ProfileContainer>
      <UserImg src={PersonGrey} />
      <UserInfo>
        <UserName>{auth?.user?.name || "undefined"}</UserName>
        <UserAddress>
          {auth?.user?.email || "이메일을 등록해 주세요."}
        </UserAddress>
        <UserIntro>힙하고 싶으면 힙해질 수 없음</UserIntro>
      </UserInfo>
    </ProfileContainer>
  );
};

export default UserProfile;
