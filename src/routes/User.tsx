import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import BoxOpened from "../assets/4_box1.svg";
import UserIcon from "../assets/person2.png";
import Heart from "../assets/4_heart.svg";
import { usePreloadImages } from "../hooks/usePreloadImages";
import Loader from "../components/Loader";
import { VariablesContext } from "../App";
const Container = styled.div`
  width: 100vw;

  background-color: ${(props) => props.theme.palette.white};

  padding: 40px 25px;
  padding-bottom: 20px;
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
  max-width: 45px;
  height: 31px;
  margin-bottom: 5px;
`;

const UserTabTitle = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.black};
`;

interface Props {}

const User: React.FC<Props> = () => {
  const { loading } = usePreloadImages([UserIcon, BoxOpened, Heart]);
  const globalVariables = useContext(VariablesContext);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UserProfile />
          <UserTabs>
            <UserTab>
              <Link to="/answers">
                <UserTabIcon src={BoxOpened} />
              </Link>
              <Link to="/answers">
                <UserTabTitle>{globalVariables.myAnswers}</UserTabTitle>
              </Link>
            </UserTab>
            <UserTab>
              <UserTabIcon src={Heart} />
              <UserTabTitle>{globalVariables.keeps}</UserTabTitle>
              {/* <Link to="/answers">
            <UserTabIcon src={Heart} />
          </Link>
          <Link to="/answers">
            <UserTabTitle>{globalVariables.keeps}</UserTabTitle>
          </Link> */}
            </UserTab>
          </UserTabs>
        </>
      )}
    </Container>
  );
};

export default User;
