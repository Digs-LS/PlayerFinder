import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';


const defaultTheme = createTheme();

const Page = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ marginTop:'10vh'}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#16C83D' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "#ffff" }}>
            Login
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3, color: "#ffff" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="lembrar" color="primary" sx={{ color: "#ffff" }} />}
              label="Manter-me conectado"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#16C83D", "&:hover": { backgroundColor: "#16C83D" } }}
            >
              LOGAR
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/nova-senha" style={{ color: "#16C83D" }}>
                  Esqueceu a senha?
                </Link>
              </Grid>
              {/* <Grid item>
                    <Link to="/login" variant="body2">
                      {"Não tem uma conta? Cadastre-se"}
                    </Link>
                  </Grid> */}
            </Grid>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Page;