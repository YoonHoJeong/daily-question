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
      const uid = await auth?.login(id);

      console.log(uid);

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>5</Avatar>
        <Typography component="h1" variant="h5">
          Daily Question Login In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email / Phone Number"
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
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
