import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { AdminPath, PrivatePath, PublicPath } from "./routesConfig";

export function useInternalRouter() {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      goBack() {
        navigate(-1);
      },
      push(path: RoutePath, state?: any) {
        navigate(path, { state });
      },
    };
  }, [navigate]);
}

type RoutePath = PublicPath | PrivatePath | AdminPath;
