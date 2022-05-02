import React from 'react';
import { Outlet, RouteProps } from 'react-router-dom';
import { LoadScreen } from '../components/common';
import { useAuth } from '../hooks/useAuth';
import { AdminLogin } from '../pages';
import { AdminPath } from './routesConfig';

interface Props extends RouteProps {
  redirectPath?: AdminPath;
}

const AdminRoute: React.FC<Props> = ({ redirectPath = 'admin/login' }) => {
  const auth = useAuth();

  console.log('AdminRoute');

  if (auth.isAuthenticating) {
    return <LoadScreen />;
  }

  if (!auth.user?.admin) {
    return <AdminLogin />;
  }

  return <Outlet />;
};

export default AdminRoute;
