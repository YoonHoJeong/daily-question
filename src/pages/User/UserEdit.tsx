import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import UserImage from "../../components/user/UserImage";
import EditIcon from "../../assets/icons/pencil.png";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

interface Props {}

const UserEdit: React.FC<Props> = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupKey, setPopupKey] = useState("");

  const { user } = useAuth();
  const handleOpenPopup = (e: SyntheticEvent) => {
    e.preventDefault();

    const key = (e.currentTarget as HTMLButtonElement).name;

    setPopupKey(key);
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  const inputFields = [
    {
      label: "닉네임",
      name: "name",
      value: user!!.profile.name || "이름을 입력해주세요.",
      editable: true,
    },
    {
      label: "소개",
      name: "intro",
      value: user!!.profile.intro || "내 소개를 입력해주세요.",
      editable: true,
    },
    {
      label: "이메일",
      name: "email",
      value: user!!.profile.email || "이메일을 입력해주세요.",
      editable: false,
    },
  ];

  return (
    <>
      {showPopup ? (
        <EditorPopup keyname={popupKey} closePopup={closePopup} />
      ) : null}
      <ProfileImageEditor>
        <UserImage style={{ width: "96px", height: "96px" }} />
        <button style={{ marginTop: "10px" }}>프로필 사진 바꾸기</button>
      </ProfileImageEditor>
      <ProfileInfoForm>
        {inputFields.map((field) => (
          <InputRow key={field.label}>
            <InputLabel>{field.label}</InputLabel>
            <Field>{field.value}</Field>
            {field.editable ? (
              <EditButton name={field.name} onClick={handleOpenPopup}>
                <EditIconImg src={EditIcon} />
              </EditButton>
            ) : null}
          </InputRow>
        ))}
      </ProfileInfoForm>
    </>
  );
};

interface EditorPopupProps {
  keyname: string;
  closePopup: () => void;
}

const EditorPopup: React.FC<EditorPopupProps> = ({ keyname, closePopup }) => {
  const { user } = useAuth();
  const { form, onChange, reset } = useForm({
    [keyname]: user!!.profile[keyname],
  });
  const [submitting, setSubmitting] = useState(false);
  const popupInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    popupInputRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    await user!!.updateProfile(form);

    setSubmitting(false);
    closePopup();
  };

  const updateUserProfile = async (e: SyntheticEvent) => {
    e.preventDefault();
    await handleSubmit();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    reset();
    closePopup();
  };
  const handlePressEnter = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      await handleSubmit();
    }
  };

  return (
    <EditorContainer onSubmit={updateUserProfile} onKeyDown={handlePressEnter}>
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
        defaultValue={user!!.profile[keyname]}
        onChange={onChange}
        contentEditable={!submitting}
        autoComplete="off"
        ref={popupInputRef}
        maxLength={20}
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
