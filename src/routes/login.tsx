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

function Login() {
  const [id, setId] = useState<string>("");
  const auth = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    gaLog("login_visited");
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined =
    async (e) => {
      e.preventDefault();
      const formattedId = id.replaceAll(".", "");
      const uid = await auth?.login(formattedId);

      if (uid !== null) {
        history.push("/select-category");
      }
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="이메일 / 휴대전화"
            variant="outlined"
            placeholder="email or phone-number"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            오늘의 질문이 도착했어요 😀
          </Button>
        </Box>
      </Box>

      {/* <Button
        color="warning"
        variant="contained"
        fullWidth
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "https://forms.gle/AqJ642yNG7pCwgYt7";
        }}
      >
        11월 2주차 부터 시작하기
      </Button> */}
    </Container>
  );
}

export default Login;
