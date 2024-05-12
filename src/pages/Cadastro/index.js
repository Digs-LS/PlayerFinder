import React, { useState } from "react";
import { Avatar, Button, TextField, Grid, Box, Typography, Container, Paper, Alert, Snackbar,
   FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select,
   OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputFileUpload from "../../components/fileUpload";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Inicio from "../Inicio";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const min = dayjs().add(-100, "year");
const max = dayjs().add(0, "year");//DatePicker max/min date

const Page = () => {
  const { signup } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ConfirmaSenha, setConfirmaSenha] = useState("");
  // const [nascimento, setNascimento] = useState("");
  const [estado, setEstado] = useState("");
  const [genero, setGenero] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  }; //SnackBar

  const handleSubmit = (event) => {
    event.preventDefault();

    if (senha !== ConfirmaSenha) {
      setError(
        <Snackbar open={true} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert severity="warning" variant="filled" sx={{ width: "100%" }}>
            As senhas precisam ser iguais!
          </Alert>
        </Snackbar>
      );
      return;
    }

    const res = signup(usuario, nome, email, senha, estado, genero);

    if (res) {
      setError(res);
      return;
    }

    <Snackbar open={true} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={3500} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
        Usuário cadastrado com sucesso!
      </Alert>
    </Snackbar>;
    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  const [cleared, setCleared] = React.useState(false);
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }); //DatePicker

  const handleChange = (event) => {
    setEstado(event.target.value);
  }; //Select Estado

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };//Mostrar Senha

  const { signed } = useAuth();
  if (signed) {
    return <Inicio />;
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: "2vh",
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
            Cadastro
          </Typography>
          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "90vw",
                justifyContent: "center",
              }}
            >
              <Paper
                component="div"
                style={{
                  padding: "1%",
                  margin: "1%",
                  width: "30vw",
                  backgroundColor: "#202020",
                  borderRadius: "10px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <InputFileUpload />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoFocus
                      required
                      fullWidth
                      autoComplete="given-name"
                      label="Usuário"
                      value={usuario}
                      onChange={(e) => [setUsuario(e.target.value), setError("")]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      autoComplete="name"
                      label="Nome"
                      value={nome}
                      onChange={(e) => [setNome(e.target.value), setError("")]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      autoComplete="email"
                      label="Email"
                      value={email}
                      onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />
                  </Grid>
                </Grid>
              </Paper>

              <Paper
                component="div"
                style={{
                  padding: "1%",
                  margin: "1%",
                  width: "30vw",
                  backgroundColor: "#202020",
                  borderRadius: "10px",
                }}
              >
                <Grid container spacing={4.5}>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl sx={{ width: '100%' }} variant="outlined">
                      <InputLabel htmlFor="senha">Confirmar senha *</InputLabel>
                      <OutlinedInput
                        required
                        name="confirmaSenha"
                        label="Confirmar senha"
                        type="password"
                        value={ConfirmaSenha}
                        onChange={(e) => [setConfirmaSenha(e.target.value), setError("")]}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale="pt-br"
                      localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                    >
                      <DatePicker
                        label="Data de nascimento *"
                        // value={nascimento}
                        // onChange={(e) => [setNascimento(e.target.value), setError("")]}
                        minDate={min}
                        maxDate={max}
                        sx={{ width: "100%" }}
                        slotProps={{
                          field: {
                            clearable: true,
                            onClear: () => setCleared(true),
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl sx={{ minWidth: "100%" }}>
                      <InputLabel id="label-select-input">Estado *</InputLabel>
                      <Select
                        required
                        labelId="label-select-input"
                        label="Estado"
                        value={estado}
                        onChange={handleChange}
                      >
                        <MenuItem value="" disabled> <em>Selecione</em> </MenuItem>
                        <MenuItem value={"acre"}> AC - Acre</MenuItem>
                        <MenuItem value={"alagoas"}> AL - Alagoas</MenuItem>
                        <MenuItem value={"amapa"}> AP - Amapá</MenuItem>
                        <MenuItem value={"amazonas"}> AM - Amazonas</MenuItem>
                        <MenuItem value={"bahia"}> BA - Bahia</MenuItem>
                        <MenuItem value={"ceara"}> CE - Ceará</MenuItem>
                        <MenuItem value={"distrito federal"}> DF - Distrito Federal</MenuItem>
                        <MenuItem value={"espirito santo"}> ES - Espírito Santo</MenuItem>
                        <MenuItem value={"goias"}> GO - Goiás</MenuItem>
                        <MenuItem value={"maranhao"}> MA - Maranhão</MenuItem>
                        <MenuItem value={"mato grosso"}> MT - Mato Grosso</MenuItem>
                        <MenuItem value={"mato grosso do sul"}> MS - Mato Grosso do Sul</MenuItem>
                        <MenuItem value={"minas gerais"}> MG - Minas Geráis</MenuItem>
                        <MenuItem value={"para"}> PA - Pará</MenuItem>
                        <MenuItem value={"paraiba"}> PB - Paraíba</MenuItem>
                        <MenuItem value={"parana"}> PR - Paraná</MenuItem>
                        <MenuItem value={"pernambuco"}> PE - Pernambuco</MenuItem>
                        <MenuItem value={"piaui"}> PI - Piauí</MenuItem>
                        <MenuItem value={"rio de janeiro"}> RJ - Rio de Janeiro</MenuItem>
                        <MenuItem value={"rio grande do norte"}> RN - Rio Grande do Norte</MenuItem>
                        <MenuItem value={"rio grande do sul"}> RS - Rio Grande do Sul</MenuItem>
                        <MenuItem value={"rondonia"}> RO - Rondônia</MenuItem>
                        <MenuItem value={"roraima"}> RR - Roraima</MenuItem>
                        <MenuItem value={"santa catarina"}> SC - Santa Catarina</MenuItem>
                        <MenuItem value={"sao paulo"}> SP - São Paulo</MenuItem>
                        <MenuItem value={"sergipe"}> SE - Sergipe</MenuItem>
                        <MenuItem value={"tocantins"}> TO - Tocantins</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gênero
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        value={genero}
                        onChange={(e) => [setGenero(e.target.value), setError("")]}
                      >
                        <FormControlLabel
                          required
                          value="masculino"
                          name="genero"
                          control={<Radio />}
                          label="Masculino"
                        />
                        <FormControlLabel
                          required
                          value="feminino"
                          name="genero"
                          control={<Radio />}
                          label="Feminino"
                        />
                        <FormControlLabel
                          required
                          value="outro"
                          name="genero"
                          control={<Radio />}
                          label="Prefiro não informar"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </div>

            {error}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: "20vw",
                color: "white",
                bgcolor: "#16C83D",
                "&:hover": { backgroundColor: "#16C83D" },
              }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Page;