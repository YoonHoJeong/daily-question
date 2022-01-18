import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import styled from "styled-components";
import AdminAnswers from "./AdminAnswers";
import AdminDashboard from "./AdminDashboard";
import AdminQuestions from "./AdminQuestions";
import AdminUsers from "./AdminUsers";

const Container = styled.div`
  display: flex;
`;

interface Props {}

const AdminRoutes: React.FC<Props> = () => {
  const { path } = useRouteMatch();

  return (
    <Container>
      <div>
        DailyQuestion
        <ul>
          <li>
            <Link to={`${path}`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`${path}/questions`}>Questions</Link>
          </li>
          <li>
            <Link to={`${path}/answers`}>Answers</Link>
          </li>
          <li>
            <Link to={`${path}/users`}>Users</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route path={`${path}/questions`}>
          <AdminQuestions />
        </Route>
        <Route path={`${path}/answers`}>
          <AdminAnswers />
        </Route>
        <Route path={`${path}/users`}>
          <AdminUsers />
        </Route>
        <Route exact path={`${path}`}>
          <AdminDashboard />
        </Route>
      </Switch>
    </Container>
  );
};

export default AdminRoutes;
