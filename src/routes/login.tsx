import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../app";
import Box from "@mui/material/Box";
import { gaLog } from "../services/firebase";
import styles from "../styles.module.css";

interface LoginInput {
  type: "email" | "phone_number" | null;
  id: string | null;
}

function Login() {
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
              {loginInput?.type === "email" ? (
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="이메일"
                  name="email"
                  variant="outlined"
                  placeholder="ex) daily@question.com"
                  value={loginInput.id !== null ? loginInput.id : ""}
                  onChange={handleChange}
                />
              ) : null}

              {loginInput?.type === "phone_number" ? (
                <TextField
                  fullWidth
                  id="outlined-basic"
                  name="phone_number"
                  label="휴대폰 번호"
                  variant="outlined"
                  placeholder="ex) 01012345678"
                  value={loginInput.id !== null ? loginInput.id : ""}
                  onChange={handleChange}
                />
              ) : null}

              <Button fullWidth type="submit" variant="contained">
                오늘의 질문 확인하기 😀
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
      </Box>
    </Container>
  );
}

export default Login;
