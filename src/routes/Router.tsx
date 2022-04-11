import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadScreen } from "../components/common";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { PrivateRoute, AdminRoute } from "./";
import { adminRoutes, privateRoutes, publicRoutes } from "./routesConfig";

interface Props {}

const Router: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadScreen />}>
        <Routes>
          {publicRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              }
            />
          ))}

          <Route element={<PrivateRoute />}>
            {privateRoutes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ErrorBoundary>
                    <Component />
                  </ErrorBoundary>
                }
              />
            ))}
          </Route>

          <Route element={<AdminRoute />}>
            {adminRoutes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ErrorBoundary>
                    <Component />
                  </ErrorBoundary>
                }
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
