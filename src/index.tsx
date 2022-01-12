import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AuthService from "./services/AuthService";
import App from "./app";

const authService = new AuthService();
export const AuthContext = React.createContext(authService);

ReactDOM.render(
  <React.StrictMode>
    <AuthContext.Provider value={authService}>
      <App />
    </AuthContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
