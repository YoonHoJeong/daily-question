import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import boxClicked from "../assets/Qbox1.png";
import box from "../assets/Qbox2.png";
import feedClicked from "../assets/feed1.png";
import feed from "../assets/feed2.png";
import userClicked from "../assets/person1.png";
import user from "../assets/person2.png";
import { VariablesContext } from "../App";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: ${(props) => props.theme.sizes.bottomNavHeight};

  background-color: ${(props) => props.theme.palette.white};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  list-style: none;
  border-top: 4px solid white;
`;

const SLink = styled(Link)<{ current: string }>`
  font-size: 10px;
  margin-top: 5px;
  color: ${(props) =>
    props.current === "true"
      ? props.theme.palette.blue
      : props.theme.palette.deepGrey};
`;

const NavItem = styled.li`
  width: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 30px;
`;

const exceptPathnames = ["/user/edit", "/user/keeps"];

interface Props {}

const BottomNavigation: React.FC<Props> = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const globalVariables = useContext(VariablesContext);

  if (exceptPathnames.includes(pathname)) {
    return null;
  }

  return (
    <Container>
      <NavItem>
        <Link to="/">
          <Icon src={pathname === "/" ? boxClicked : box} alt="" />
        </Link>
        <SLink to="/" current={pathname === "/" ? "true" : "false"}>
          {globalVariables.todayQuestions}
        </SLink>
      </NavItem>
      <NavItem>
        <Link to="/board">
          <Icon src={pathname === "/board" ? feedClicked : feed} alt="" />
        </Link>
        <SLink to="/board" current={pathname === "/board" ? "true" : "false"}>
          {globalVariables.board}
        </SLink>
      </NavItem>
      <NavItem>
        <Link to="/user">
          <Icon src={pathname === "/user" ? userClicked : user} alt="" />
        </Link>
        <SLink to="/user" current={pathname === "/user" ? "true" : "false"}>
          {globalVariables.user}
        </SLink>
      </NavItem>
    </Container>
  );
};

export default BottomNavigation;
