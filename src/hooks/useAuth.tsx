import React, { useContext, useState } from "react";

interface Props {}
interface Auth {
  user: User | null;
}

interface User {
  name: string;
}

export const AuthContext = React.createContext<Auth>({
  user: null,
});
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProviderAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  return { user };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
