import React from "react";

interface Props {
  handleLogin: () => void;
}

function Login({ handleLogin }: Props) {
  return (
    <div>
      <input type="text" placeholder="email or phone-number" />
      <button onClick={handleLogin}>login</button>
    </div>
  );
}

export default Login;
