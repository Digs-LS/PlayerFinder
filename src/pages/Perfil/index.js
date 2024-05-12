import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputFileUpload from "../../components/fileUpload";
import useAuth from "../../hooks/useAuth";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
  
  const Page = () => {
    const { user } = useAuth();

    const [editar, setEditar] = React.useState(false);
    const toggleEditar = () => {
      setEditar(!editar);
    };//Botão editar 

    const handleSubmit = (event) => {
        event.preventDefault();
    };

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
                    <Avatar sx={{ m: 1, bgcolor: "inherit" }}>
                        <AccountCircleIcon style={{ fontSize: '50px', color: "#16C83D" }} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Meu perfil
                    </Typography>

                    {editar === false ? 
                        <Button
                            onClick={toggleEditar}
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                width: "8vw",
                                color: 'white',
                                bgcolor: "#16C83D",
                                "&:hover": { backgroundColor: "#16C83D" },
                            }}
                        >
                            Editar
                        </Button>
                        :
                        <Button
                            onClick={toggleEditar}
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                width: "8vw",
                                color: 'white',
                                bgcolor: "#16C83D",
                                "&:hover": { backgroundColor: "#16C83D" },
                            }}
                        >
                            Salvar
                        </Button>
                    }

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
                                <Grid container spacing={5} sx={{}}>
                                    <Grid item xs={12}>
                                        <InputFileUpload />
                                    </Grid>

                                    <Grid item xs={12} >
                                        <Typography variant="h6" sx={{color: '#16C83D', paddingBottom: '0.5vh', float: 'inline-start'}}>
                                            Username:
                                        </Typography>
                                        <TextField required autoComplete="given-name" defaultValue={user[0].usuario} InputProps={{readOnly: !editar === true ? true : false}} variant={!editar ? "standard" : "filled"} sx={{width: '100%'}}/>
                                    </Grid>
                                    
                                    <Grid item xs={12} >
                                        <Typography variant="h6" sx={{color: '#16C83D', paddingBottom: '0.5vh', float: 'inline-start'}}>
                                            Nome:
                                        </Typography>
                                        <TextField required autoComplete="name" defaultValue={user[0].nome} InputProps={{readOnly: !editar === true ? true : false}} variant={!editar ? "standard" : "filled"} sx={{width: '100%'}}/>
                                    </Grid>
                                    
                                    <Grid item xs={12} >
                                        <Typography variant="h6" sx={{color: '#16C83D', paddingBottom: '0.5vh', float: 'inline-start'}}>
                                            Email:
                                        </Typography>
                                        <TextField required autoComplete="email" defaultValue={user[0].email} InputProps={{readOnly: !editar === true ? true : false}} variant={!editar ? "standard" : "filled"} sx={{width: '100%'}}/>
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
                                <Grid container spacing={5} style={{paddingTop: '20%'}}>
                                    <Grid item xs={12} >
                                        <Typography variant="h6" sx={{color: '#16C83D', paddingBottom: '0.5vh', float: 'inline-start'}}>
                                            Data de nascimento:
                                        </Typography>
                                        <TextField required defaultValue={user[0].nascimento} InputProps={{readOnly: !editar === true ? true : false}} variant={!editar ? "standard" : "filled"} sx={{width: '100%'}}/>
                                    </Grid>
                                    
                                    <Grid item xs={12} >
                                        <Typography variant="h6" sx={{color: '#16C83D', paddingBottom: '0.5vh', float: 'inline-start'}}>
                                            Estado:
                                        </Typography>
                                        <TextField required defaultValue={user[0].estado} InputProps={{readOnly: !editar === true ? true : false}} variant={!editar ? "standard" : "filled"} sx={{width: '100%'}}/>
                                    </Grid>
                                    
                                    <Grid item xs={12} >
                                        <Typography variant="h6" sx={{color: '#16C83D', paddingBottom: '0.5vh', float: 'inline-start'}}>
                                            Gênero:
                                        </Typography>
                                        <TextField required defaultValue={user[0].genero} InputProps={{readOnly: !editar === true ? true : false}} variant={!editar ? "standard" : "filled"} sx={{width: '100%'}}/>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </div>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Page;
