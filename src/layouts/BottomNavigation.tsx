import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { VariablesContext } from "../App";

import {
  BoxClickedIcon,
  BoxIcon,
  FeedClickedIcon,
  FeedIcon,
  PersonClickedIcon,
  PersonIcon,
  DiaryClickedIcon,
  DiaryIcon,
} from "../assets/icons";
import sizes from "./sizes";

interface Props {}

const BottomNavigation: React.FC<Props> = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const globalVariables = useContext(VariablesContext);

  const NavigationItem = (navigation: Navigation) => (
    <NavItem key={navigation.pathnames[0]}>
      <Link to={navigation.pathnames[0]}>
        <Icon
          src={
            navigation.pathnames.includes(pathname)
              ? navigation.iconsUrl.clicked
              : navigation.iconsUrl.default
          }
          alt=""
        />
      </Link>
      <SLink
        to={navigation.pathnames[0]}
        current={navigation.pathnames.includes(pathname) ? "true" : "false"}
      >
        {globalVariables.pathnames[navigation.pathnames[0]]}
      </SLink>
    </NavItem>
  );

  if (hasNotBottomNavigation(pathname)) {
    return null;
  }

  return (
    <Navigator>
      {Navigations.map((navigation) => NavigationItem(navigation))}
    </Navigator>
  );
};

function hasNotBottomNavigation(pathname: string) {
  const exceptPathnames = ["/user/edit", "/user/keeps", "/question"];

  for (const exceptPathname of exceptPathnames) {
    if (pathname.includes(exceptPathname)) {
      return true;
    }
  }

  return false;
}

interface Navigation {
  pathnames: string[];
  iconsUrl: {
    default: string;
    clicked: string;
  };
}

const Navigations: Navigation[] = [
  {
    pathnames: ["/", "/submit-done"],
    iconsUrl: { clicked: BoxClickedIcon, default: BoxIcon },
  },
  {
    pathnames: ["/board"],
    iconsUrl: { clicked: FeedClickedIcon, default: FeedIcon },
  },
  {
    pathnames: [
      "/answers",
      "/answers/weekly",
      "/answers/daily",
      "/answers/monthly",
    ],
    iconsUrl: { clicked: DiaryClickedIcon, default: DiaryIcon },
  },
  {
    pathnames: ["/user"],
    iconsUrl: { clicked: PersonClickedIcon, default: PersonIcon },
  },
];

const Navigator = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: ${sizes.bottomNavigation.height};

  background-color: ${(props) => props.theme.palette.bgGrey};
  border-top: 4px solid ${(props) => props.theme.palette.white};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 30px;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 6px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 6px);

  list-style: none;
  border-top: 4px solid white;
`;

const SLink = styled(Link)<{ current: string }>`
  font-size: 10px;
  margin-top: 3px;
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
  justify-content: flex-end;
`;

const Icon = styled.img`
  width: 28px;
`;

export default BottomNavigation;
