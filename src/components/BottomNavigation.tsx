import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import BoxClickedIcon from "../assets/icons/box_blue.png";
import BoxIcon from "../assets/icons/box_gray.png";
import FeedClickedIcon from "../assets/icons/feed_blue.png";
import FeedIcon from "../assets/icons/feed_gray.png";
import PersonClickedIcon from "../assets/icons/person_blue.png";
import PersonIcon from "../assets/icons/person_gray.png";
import DiaryClickedIcon from "../assets/icons/diary_blue.png";
import DiaryIcon from "../assets/icons/diary_gray.png";
import { VariablesContext } from "../App";

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
    iconsUrl: { clicked: BoxClickedIcon, default: BoxIcon },
  },
  {
    pathname: "/board",
    iconsUrl: { clicked: FeedClickedIcon, default: FeedIcon },
  },
  {
    pathname: "/answers",
    iconsUrl: { clicked: DiaryClickedIcon, default: DiaryIcon },
  },
  {
    pathname: "/user",
    iconsUrl: { clicked: PersonClickedIcon, default: PersonIcon },
  },
];

interface Props {}

function hasNotBottomNavigation(pathname: string) {
  const exceptPathnames = ["/user/edit", "/user/keeps", "/question"];

  for (const exceptPathname of exceptPathnames) {
    if (pathname.includes(exceptPathname)) {
      return true;
    }
  }

  return false;
}

const BottomNavigation: React.FC<Props> = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const globalVariables = useContext(VariablesContext);

  if (hasNotBottomNavigation(pathname)) {
    return null;
  }

  const NavigationItem = (navigation: Navigation) => (
    <NavItem key={navigation.pathname}>
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
  );

  return (
    <Navigator>
      {Navigations.map((navigation) => NavigationItem(navigation))}
    </Navigator>
  );
};

const Navigator = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: ${(props) => props.theme.sizes.bottomNavHeight};

  background-color: ${(props) => props.theme.palette.bgGrey};
  border-top: 4px solid ${(props) => props.theme.palette.white};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
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
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Icon = styled.img`
  width: 30px;
`;

export default BottomNavigation;
