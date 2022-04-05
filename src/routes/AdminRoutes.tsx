import React from "react";
import styled from "styled-components";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
// import {
//   AdminAnswers,
//   AdminDashboard,
//   AdminQuestions,
//   AdminUsers,
// } from "../pages/Admin";
import { ErrorBoundary } from "../components/common/ErrorBoundary";

const AdminAnswers = React.lazy(() => import("../pages/Admin/AdminAnswers"));
const AdminDashboard = React.lazy(
  () => import("../pages/Admin/AdminDashboard")
);
const AdminQuestions = React.lazy(
  () => import("../pages/Admin/AdminQuestions")
);
const AdminUsers = React.lazy(() => import("../pages/Admin/AdminUsers"));

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
          <ErrorBoundary>
            <AdminQuestions />
          </ErrorBoundary>
        </Route>
        <Route path={`${path}/answers`}>
          <ErrorBoundary>
            <AdminAnswers />
          </ErrorBoundary>
        </Route>
        <Route path={`${path}/users`}>
          <ErrorBoundary>
            <AdminUsers />
          </ErrorBoundary>
        </Route>
        <Route exact path={`${path}`}>
          <ErrorBoundary>
            <AdminDashboard />
          </ErrorBoundary>
        </Route>
      </Switch>
    </Container>
  );
};

export default AdminRoutes;
