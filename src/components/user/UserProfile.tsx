import React from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import UserImage from "./UserImage";
import { ArrowRightIcon } from "../../assets/icons";
import { useInternalRouter } from "../../routes/useInternalRouter";

interface Props {
  editable?: boolean;
  showEmail?: boolean;
}

const UserProfile: React.FC<Props> = ({
  editable = true,
  showEmail = true,
}) => {
  const { user } = useAuth();
  const { push } = useInternalRouter();
  const moveToUserEdit = () => {
    push("/user/edit");
  };

  return (
    <ProfileContainer>
      <UserImage style={{ width: "60px", height: "60px" }} />
      <UserInfo>
        <UserName>{user!!.profile.name}</UserName>
        <UserIntro>{user!!.profile.intro}</UserIntro>
        {showEmail && (
          <UserAddress>{user!!.email || "이메일을 등록해주세요."}</UserAddress>
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
      <Icon src={ArrowRightIcon} />
    </button>
  );
};

const ProfileContainer = styled.section`
  display: flex;

  width: 100%;

  background-color: ${(props) => props.theme.palette.white};
`;

const Icon = styled.img`
  width: 24px;
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

export default UserProfile;
