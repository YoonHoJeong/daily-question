import React, { createContext, useState } from "react";
import "./app.css";
import { Router } from "./components/router";

interface User {
  id: string;
}

const userContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {}

function App() {
  const [user, setUser] = useState<User>({ id: "" });

  function login(id: string) {}

  return (
    <>
      <header>header</header>
      <Router />
    </>
  );
}

export default App;
