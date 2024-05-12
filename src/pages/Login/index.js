import React, { useState } from "react";
import { Avatar, Button, TextField, Grid, Box, Typography,
  FormControl, FormControlLabel, InputLabel, Checkbox,
  OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Inicio from "../Inicio";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Page = () => {
  const { signin, signed } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/inicio");
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };//Mostrar Senha

  if(signed){
    return <Inicio />
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          marginTop: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#16C83D" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            autoFocus
            required
            fullWidth
            autoComplete="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor="senha">Senha *</InputLabel>
            <OutlinedInput
              required
              name="senha"
              value={senha}
              onChange={(e) => [setSenha(e.target.value), setError("")]}  
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mostrar senha"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                value="lembrar"
                color="primary"
                sx={{ color: "#ffff" }}
              />
            }
            label="Manter-me conectado"
          />
          <Typography sx={{marginTop: '1vh', color: 'red'}}>{error}</Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: "white",
              bgcolor: "#16C83D",
              "&:hover": { backgroundColor: "#16C83D" },
            }}
          >
            LOGAR
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/nova-senha" style={{ color: "#16C83D" }}>
                Esqueceu a senha?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Page;
