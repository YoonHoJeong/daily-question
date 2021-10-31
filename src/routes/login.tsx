import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../app";
import Box from "@mui/material/Box";

function Login() {
  const [id, setId] = useState<string>("");
  const auth = useContext(UserContext);

  const history = useHistory();

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
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>D</Avatar>
        <Typography component="h1" variant="h5">
          Daily Question
        </Typography>
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
            오늘의 질문이 도착했어요!
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
