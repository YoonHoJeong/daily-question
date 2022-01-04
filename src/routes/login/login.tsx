import { Button, CssBaseline, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../app";
import Box from "@mui/material/Box";
import { gaLog } from "../../services/firebase";
import styles from "./login.module.css";

interface LoginInput {
  type: "email" | "phone_number" | null;
  id: string | null;
}

function LoginScreen() {
  const [loginInput, setLoginInput] = useState<LoginInput>({
    id: null,
    type: null,
  });
  const auth = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    gaLog("login_visited");
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined =
    async (e) => {
      e.preventDefault();
      const formattedId = loginInput.id?.replaceAll(".", "");

      if (formattedId) {
        const uid = await auth?.login(formattedId);

        if (uid !== null) {
          history.push("/select-category");
        }
      } else {
        alert(`이메일, 혹은 휴대폰 번호를 확인해 주세요.`);
      }
    };
  const handleClickLoginType = (e: any) => {
    const type: "email" | "phone_number" = e.currentTarget.name;
    setLoginInput({ ...loginInput, type });
  };

  const handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = (e) => {
    setLoginInput({ ...loginInput, id: e.currentTarget.value });
  };

  const handleClickBack:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = (e) => {
    setLoginInput({
      id: null,
      type: null,
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.titleBox}>
        <img className={styles.logo} src="logo.png" alt="" />
        <Typography className={styles.loginTitle} component="h1" variant="h5">
          1 Question 1 Day
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {loginInput.type === null ? (
          <div className={styles.loginButtonList}>
            <Button
              name="email"
              variant="contained"
              color="info"
              onClick={handleClickLoginType}
            >
              이메일로 로그인하기
            </Button>
            <Button
              name="phone_number"
              variant="contained"
              color="secondary"
              onClick={handleClickLoginType}
            >
              휴대폰 번호로 로그인하기
            </Button>
          </div>
        ) : (
          <>
            <TextField
              fullWidth
              id="outlined-basic"
              name={loginInput?.type}
              label={
                loginInput?.type === "phone_number" ? "휴대폰 번호" : "이메일"
              }
              variant="outlined"
              placeholder={
                loginInput?.type === "phone_number"
                  ? "ex) 01031918941"
                  : "ex) gildong@5years.com"
              }
              value={loginInput.id !== null ? loginInput.id : ""}
              onChange={handleChange}
            />

            <Button id="login" fullWidth type="submit" variant="contained">
              로그인
            </Button>
            <Button
              fullWidth
              type="submit"
              color="success"
              onClick={handleClickBack}
            >
              이전 화면으로 돌아가기
            </Button>
          </>
        )}
      </form>
    </main>
  );
}

export default LoginScreen;
