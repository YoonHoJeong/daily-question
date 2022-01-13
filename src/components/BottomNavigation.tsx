import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 20px;
  list-style: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

interface Props {}

const BottomNavigation: React.FC<Props> = () => {
  return (
    <Container>
      <li>
        <Link to="/">Today</Link>
      </li>
      <li>
        <Link to="/">Board</Link>
      </li>
      <li>
        <Link to="/answers">Answers</Link>
      </li>
    </Container>
  );
};

export default BottomNavigation;
