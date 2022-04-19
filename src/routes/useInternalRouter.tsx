import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { AdminPath, PrivatePath, PublicPath } from './routesConfig';

export function useInternalRouter() {
  const navigate = useNavigate();
  const params = useParams();

  return useMemo(() => {
    return {
      goBack() {
        navigate(-1);
      },
      push(path: RoutePath, state?: any) {
        navigate(path, { state });
      },
      replace(path: RoutePath, state?: any) {
        navigate(path, { replace: true, state });
      },
      params,
    };
  }, [navigate, params]);
}

export type RoutePath = PublicPath | PrivatePath | AdminPath;
