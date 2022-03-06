import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserImage from "../../components/user/UserImage";
import EditIcon from "../../assets/icons/pencil.png";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";

interface Props {}

const UserEdit: React.FC<Props> = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupValues, setPopupValues] = useState({
    key: "",
    defaultValue: "",
  });
  const popupInputRef = useRef<HTMLInputElement>(null);

  const auth = useAuth();
  const handleOpenPopup = (e: SyntheticEvent) => {
    e.preventDefault();
    const key = (e.currentTarget as HTMLButtonElement).name;
    setPopupValues({ key, defaultValue: auth.user!!.profile[key] || "" });
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const submitUserProfile = async (key: string, value: number | string) => {
    await auth.updateUserProfile({ [key]: value });
  };

  useEffect(() => {
    popupInputRef.current?.focus();
  }, [showPopup]);

  return (
    <>
      <EditorPopup
        show={showPopup}
        keyname={popupValues.key}
        defaultValue={popupValues.defaultValue}
        closePopup={closePopup}
        submitPopup={submitUserProfile}
        popupInputRef={popupInputRef}
      />
      <div>
        <ProfileImageEditor>
          <UserImage style={{ width: "96px", height: "96px" }} />
          <button style={{ marginTop: "10px" }}>프로필 사진 바꾸기</button>
        </ProfileImageEditor>
        <ProfileInfoForm>
          <InputRow>
            <InputLabel>닉네임</InputLabel>
            <Field>{auth.user?.profile.name || "이름을 입력해주세요."}</Field>
            <EditButton name="name" onClick={handleOpenPopup}>
              <EditIconImg src={EditIcon} />
            </EditButton>
          </InputRow>
          <InputRow>
            <InputLabel>소개</InputLabel>
            <Field>
              {auth.user?.profile.intro || "내 소개를 입력해주세요."}
            </Field>
            <EditButton name="intro" onClick={handleOpenPopup}>
              <EditIconImg src={EditIcon} />
            </EditButton>
          </InputRow>
          <InputRow>
            <InputLabel>이메일</InputLabel>
            <Field>
              {auth.user?.profile.email || "이메일을 입력해주세요."}
            </Field>
          </InputRow>
        </ProfileInfoForm>
      </div>
    </>
  );
};

interface EditorPopupProps {
  show: boolean;
  keyname: string;
  defaultValue: string;
  closePopup: () => void;
  submitPopup: (key: string, value: number | string) => Promise<void>;
  popupInputRef: React.RefObject<HTMLInputElement>;
}

const EditorPopup: React.FC<EditorPopupProps> = ({
  show,
  keyname,
  defaultValue,
  closePopup,
  submitPopup,
  popupInputRef,
}) => {
  const { form, onChange } = useForm({ [keyname]: defaultValue });
  const [submitting, setSubmitting] = useState(false);

  const updateUserProfile = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);
    await submitPopup(keyname, form[keyname]);
    setSubmitting(false);
    closePopup();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    closePopup();
  };

  if (!show) {
    return null;
  }

  return (
    <EditorContainer onSubmit={updateUserProfile}>
      <EditorHeader>
        <button onClick={handleCancel} disabled={submitting}>
          취소
        </button>
        <button onClick={updateUserProfile} disabled={submitting}>
          확인
        </button>
      </EditorHeader>
      <EditorInput
        name={keyname}
        defaultValue={defaultValue}
        onChange={onChange}
        contentEditable={!submitting}
        autoComplete="off"
        ref={popupInputRef}
      />
    </EditorContainer>
  );
};

export default UserEdit;

const EditorContainer = styled.form`
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.7);

  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
`;
const EditorHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  padding: 20px 18px;
  padding-top: 30px;

  display: flex;
  justify-content: space-between;
  & > button {
    color: ${(props) => props.theme.palette.white};
  }

  & > span {
    color: ${(props) => props.theme.palette.white};
    font-weight: 500;
    font-size: 16px;
  }
`;

const EditorInput = styled.input`
  width: 90%;
  color: ${(props) => props.theme.palette.white};

  border: none;
  border-bottom: 1px solid ${(props) => props.theme.palette.white};

  background-color: transparent;
  text-align: center;
  padding-bottom: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const ProfileImageEditor = styled.div`
  width: 100%;
  height: 170px;

  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileInfoForm = styled.div`
  width: 100%;
  padding: 28px 33px;

  background-color: ${(props) => props.theme.palette.white};

  margin-top: 4px;
`;

const InputRow = styled.div`
  width: 100%;
  height: 19px;
  display: flex;
  align-items: center;

  margin-bottom: 12px;
`;

const InputLabel = styled.div`
  width: 70px;
  font-weight: 500;
  font-size: 14px;
`;

const Field = styled.p`
  flex: 1;
  font-size: 14px;
`;

const EditButton = styled.button``;
const EditIconImg = styled.img`
  width: 11px;
  height: 11px;
`;
