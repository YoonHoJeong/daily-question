import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import BoxClickedIconUrl from "../assets/Qbox1.png";
import BoxIconUrl from "../assets/Qbox2.png";
import BoardClickedIconUrl from "../assets/feed1.png";
import BoardIconUrl from "../assets/feed2.png";
import UserClickedIconUrl from "../assets/person1.png";
import UserIconUrl from "../assets/person2.png";
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

interface Navigation {
  pathname: string;
  iconsUrl: {
    default: string;
    clicked: string;
  };
}

const Navigations: Navigation[] = [
  {
    pathname: "/",
    iconsUrl: { clicked: BoxClickedIconUrl, default: BoxIconUrl },
  },
  {
    pathname: "/board",
    iconsUrl: { clicked: BoardClickedIconUrl, default: BoardIconUrl },
  },
  {
    pathname: "/answers",
    iconsUrl: { clicked: BoxClickedIconUrl, default: BoxIconUrl },
  },
  {
    pathname: "/user",
    iconsUrl: { clicked: UserClickedIconUrl, default: UserIconUrl },
  },
];

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
      {Navigations.map((navigation) => (
        <NavItem>
          <Link to={navigation.pathname}>
            <Icon
              src={
                pathname === navigation.pathname
                  ? navigation.iconsUrl.clicked
                  : navigation.iconsUrl.default
              }
              alt=""
            />
          </Link>
          <SLink
            to={navigation.pathname}
            current={pathname === navigation.pathname ? "true" : "false"}
          >
            {globalVariables.pathnames[navigation.pathname]}
          </SLink>
        </NavItem>
      ))}
      {/* <NavItem>
        <Link to="/">
          <Icon src={pathname === "/" ? BoxClickedIconUrl : BoxIconUrl} alt="" />
        </Link>
        <SLink to="/" current={pathname === "/" ? "true" : "false"}>
          {globalVariables.todayQuestions}
        </SLink>
      </NavItem>
      <NavItem>
        <Link to="/board">
          <Icon src={pathname === "/board" ? BoardClickedIconUrl : BoardIconUrl} alt="" />
        </Link>
        <SLink to="/board" current={pathname === "/board" ? "true" : "false"}>
          {globalVariables.board}
        </SLink>
      </NavItem>
      <NavItem>
        <Link to="/user">
          <Icon src={pathname === "/user" ? UserClickedIconUrl : UserIconUrl} alt="" />
        </Link>
        <SLink to="/user" current={pathname === "/user" ? "true" : "false"}>
          {globalVariables.user}
        </SLink>
      </NavItem> */}
    </Container>
  );
};

export default BottomNavigation;
