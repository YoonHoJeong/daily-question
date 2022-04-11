import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { LoadScreen } from "../components/common";
import { useAuth } from "../hooks/useAuth";

interface Props extends RouteProps {
  redirectPath?: string;
}

const AdminRoute: React.FC<Props> = ({ redirectPath = "/dqadmin/login" }) => {
  const auth = useAuth();

  if (!auth) {
    throw new Error("authentication not working");
  }

  if (auth.isAuthenticating) {
    return <LoadScreen />;
  }

  if (!auth.user?.admin) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default AdminRoute;
