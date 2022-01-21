import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import boxClicked from "../assets/Qbox1.png";
import box from "../assets/Qbox2.png";
import feedClicked from "../assets/feed1.png";
import feed from "../assets/feed2.png";
import userClicked from "../assets/person1.png";
import user from "../assets/person2.png";

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  list-style: none;
  border-top: 4px solid white;
`;

const SLink = styled(Link)<{ current: boolean }>`
  font-size: 10px;
  margin-top: 5px;
  color: ${(props) =>
    props.current ? props.theme.palette.blue : props.theme.palette.deepGrey};
`;

const NavItem = styled.li`
  width: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 35px;
`;

interface Props {}

const BottomNavigation: React.FC<Props> = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Container>
      <NavItem>
        <Link to="/">
          <Icon src={pathname === "/" ? boxClicked : box} alt="" />
        </Link>
        <SLink to="/" current={pathname === "/"}>
          오늘의 질문
        </SLink>
      </NavItem>
      <NavItem>
        <Link to="/">
          <Icon src={pathname === "/board" ? feedClicked : feed} alt="" />
        </Link>
        <SLink to="/" current={pathname === "/board"}>
          게시판
        </SLink>
      </NavItem>
      <NavItem>
        <Link to="/user">
          <Icon src={pathname === "/user" ? userClicked : user} alt="" />
        </Link>
        <SLink to="/user" current={pathname === "/user"}>
          내 정보
        </SLink>
      </NavItem>
    </Container>
  );
};

export default BottomNavigation;
