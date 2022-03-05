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

const UserInfo = styled.ul`
  width: 100%;
  max-height: 60px;
  margin-left: 15px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  & > li:not(:first-child) {
    margin-top: 5px;
  }
`;
const UserName = styled.li`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.black};
`;

const UserAddress = styled.li`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.black};
`;
const UserIntro = styled.li`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.black};
`;
interface Props {
  editable?: boolean;
  showEmail?: boolean;
}

const UserProfile: React.FC<Props> = ({
  editable = true,
  showEmail = true,
}) => {
  const auth = useAuth();
  const history = useHistory();
  const moveToUserEdit = () => {
    history.push("/user/edit");
  };

  return (
    <ProfileContainer>
      <UserImage style={{ width: "60px", height: "60px" }} />
      <UserInfo>
        <UserName>{auth?.user?.profile.name}</UserName>
        <UserIntro>{auth?.user?.profile.intro}</UserIntro>
        {showEmail && (
          <UserAddress>
            {auth?.user?.profile.email || "이메일을 등록해주세요."}
          </UserAddress>
        )}
      </UserInfo>
      <MoveToUserEditButton show={editable} moveToUserEdit={moveToUserEdit} />
    </ProfileContainer>
  );
};

interface MoveToUserEditButtonProps {
  show: boolean;
  moveToUserEdit: () => void;
}

const MoveToUserEditButton: React.FC<MoveToUserEditButtonProps> = ({
  show,
  moveToUserEdit,
}) => {
  if (!show) {
    return null;
  }

  return (
    <button onClick={moveToUserEdit}>
      <ChevronRightIcon sx={{ height: "24px" }} />
    </button>
  );
};

export default UserProfile;
