import React from "react";
import styled from "styled-components";
import UserIcon from "../../assets/icons/person_gray.png";

const UserImgContainer = styled.div<{ imageUrl?: string }>`
  min-width: 60px;
  width: 60px;
  height: 60px;

  background-color: ${(props) => props.theme.palette.bgGrey};
  background-image: ${(props) => props.imageUrl};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserImg = styled.img`
  width: 55%;
`;

interface Props {
  imageUrl?: string;
  style: {
    display?: "flex" | "block" | "none";
    width: string | number;
    height: string | number;
  };
}

const UserImage: React.FC<Props> = ({ style: styleInput, imageUrl }) => {
  const style = { ...styleInput, minWidth: styleInput.width };

  return imageUrl ? (
    <UserImgContainer
      style={{ ...style }}
      imageUrl={imageUrl}
    ></UserImgContainer>
  ) : (
    <UserImgContainer style={{ ...style }}>
      <UserImg src={UserIcon} />
    </UserImgContainer>
  );
};

export default UserImage;
