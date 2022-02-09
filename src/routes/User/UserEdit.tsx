import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import UserImage from "../../components/user/UserImage";
import { useForm } from "../../hooks/useForm";

interface Props {}

const UserEdit: React.FC<Props> = () => {
  const { form, onChange } = useForm({ name: "", intro: "" });
  const saveUserInfo = (e: SyntheticEvent) => {
    e.preventDefault();

    if (form.name !== "" && form.intro !== "") console.log(form);
  };

  return (
    <div>
      <ProfileImageEditor>
        <UserImage style={{ width: "96px", height: "96px" }} />
        <button>프로필 사진 바꾸기</button>
      </ProfileImageEditor>
      <ProfileInfoForm>
        <input type="text" onChange={onChange} />
        <input type="text" onChange={onChange} />
        <p>email.email.com</p>

        <button onClick={saveUserInfo}>저장</button>
      </ProfileInfoForm>
    </div>
  );
};

export default UserEdit;

const ProfileImageEditor = styled.div`
  width: 100%;
  height: 170px;

  background-color: ${(props) => props.theme.palette.white}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileInfoForm = styled.form`
  width: 100%;
  padding: 28px 33px;

  background-color: ${(props) => props.theme.palette.white};
`;
