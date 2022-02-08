import React from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useHistory } from "react-router-dom";
import UserImage from "./user/UserImage";

const ProfileContainer = styled.section`
  display: flex;

  width: 100%;

  background-color: ${(props) => props.theme.palette.white};
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
  const history = useHistory();
  const moveToProfileEdit = () => {
    history.push("/user/edit");
  };

  return (
    <ProfileContainer>
      <UserImage style={{ width: "60px", height: "60px" }} />
      <UserInfo>
        <UserName>{auth?.user?.name || "이름을 등록해주세요."}</UserName>
        <UserAddress>
          {auth?.user?.email || "이메일을 등록해주세요."}
        </UserAddress>
        {/* <UserIntro>힙하고 싶으면 힙해질 수 없음</UserIntro> */}
      </UserInfo>
      <button onClick={moveToProfileEdit}>
        <ChevronRightIcon sx={{ height: "24px" }} />
      </button>
    </ProfileContainer>
  );
};

export default UserProfile;
