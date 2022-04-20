import React from 'react';
import styled from 'styled-components';
import { PersonIcon } from '../../assets/icons';

interface Props {
  imageUrl?: string;
  style: {
    display?: 'flex' | 'block' | 'none';
    width: string | number;
    height: string | number;
  };
}

const UserImage: React.FC<Props> = ({ style: styleInput, imageUrl }) => {
  const style = { ...styleInput, minWidth: styleInput.width };

  return imageUrl ? (
    <UserImgContainer style={{ ...style }} imageUrl={imageUrl}></UserImgContainer>
  ) : (
    <UserImgContainer style={{ ...style }}>
      <UserImg src={PersonIcon} />
    </UserImgContainer>
  );
};

const UserImgContainer = styled.div<{ imageUrl?: string }>`
  min-width: 60px;
  width: 60px;
  height: 60px;

  background-color: ${(props) => props.theme.palette.grey200};
  background-image: ${(props) => props.imageUrl};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserImg = styled.img`
  width: 55%;
`;

export default UserImage;
