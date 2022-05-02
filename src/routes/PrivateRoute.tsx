import React from 'react';
import { RouteProps, Navigate, Outlet } from 'react-router-dom';
import { LoadScreen } from '../components/common';
import { useAuth } from '../hooks/useAuth';

interface Props extends RouteProps {
  redirectPath?: string;
}

const PrivateRoute: React.FC<Props> = ({ redirectPath = '/onboarding' }) => {
  const auth = useAuth();

  if (auth.isAuthenticating) {
    return <LoadScreen />;
  }

  if (auth.user === null) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
