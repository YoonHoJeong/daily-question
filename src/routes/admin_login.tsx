import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { loginWithEmail } from "../services/auth";
import styles from "../styles.module.css";
import axios from "axios";

interface Props {}

interface FormProps {
  email: string;
  password: string;
}

export const AdminLogin: React.FC<Props> = () => {
  const [form, setForm] = useState<FormProps>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const history = useHistory();
  const handleChange = (e: any) => {
    setError("");
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleLogin = async () => {
    const { email, password } = form;
    const user = await loginWithEmail(email, password);
    if (user === null) {
      setError("이메일 혹은 비밀번호를 확인해주세요.");
    } else {
      history.push("/admin/main");
    }
  };
  useEffect(() => {
    const getData = async () => {
      const {
        data: { IPv4: ip },
      } = await axios.get("https://geolocation-db.com/json/");
      console.log(ip);

      // setIP(res.data.IPv4)
    };
    //passing getData method to the lifecycle method
    getData();
  }, []);

  return (
    <form className={styles.adminPage}>
      <header>Admin Page</header>
      <TextField
        label="이메일"
        type="email"
        name="email"
        className={styles.adminInput}
        value={form.email}
        onChange={handleChange}
        error={error !== ""}
      />
      <TextField
        label="비밀번호"
        type="password"
        name="password"
        className={styles.adminInput}
        value={form.password}
        onChange={handleChange}
        error={error !== ""}
        helperText={error}
      />
      <Button onClick={handleLogin}>로그인</Button>
    </form>
  );
};
