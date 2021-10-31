import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../app";

interface Props {}

function Login() {
  const [id, setId] = useState<string>("");
  const auth = useContext(UserContext);

  const history = useHistory();

  const handleLogin = async () => {
    const uid = await auth?.login(id);

    console.log(uid);

    if (uid !== null) {
      history.push("/select-category");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="email or phone-number"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <button onClick={handleLogin}>login</button>
    </div>
  );
}

export default Login;
