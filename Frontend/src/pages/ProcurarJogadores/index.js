import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Grid, Box, Container, Typography, Paper } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PlayerList from "../../components/playerlist";
import FilterPerGame from "../../components/FilterPerGame";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const Page = () => {
    const [ attributes, setAttributes ] = useState([]) 
    const { jogoId } = useParams();
    const [jogo, setJogo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingGame, setLoadingGame] = useState(true);
    const [filtersUsers, setFiltersUsers] = useState(null) 

    useEffect(() => {
        const fetchJogo = async () => {
            setLoadingGame(true)
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:8080/api/jogos/${jogoId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setJogo(data);
                    setAttributes(data.attributes)
                } else {
                    throw new Error("Erro ao buscar o jogo");
                }
            } catch (error) {
                console.error("Erro ao buscar o jogo:", error);
            } finally {
                setLoadingGame(false);
            }
        };

        fetchJogo();
    }, [jogoId]);

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="md">
                <Box sx={{ mt: "2vh", display: "flex", flexDirection: "column", alignItems: "center", color: "white", }} >
                    <Avatar sx={{ m: 1, bgcolor: "#16C83D" }}>
                        <SportsEsportsIcon fontSize="medium" />
                    </Avatar>
                    {loadingGame ? (
                        <Typography component="h1" variant="h5">
                            Carregando...
                        </Typography>
                    ) : (
                        <Typography component="h1" variant="h5">
                            {jogo ? jogo.titulo : "Jogo não encontrado"}
                        </Typography>
                    )}

                    <Typography sx={{ margin: '3%' }}>
                        <FilterPerGame jogoId={jogoId} atributos={attributes} filtersUsers={filtersUsers} setLoading={setLoading} setFiltersUsers={setFiltersUsers} loading={loading}/>
                    </Typography>
                    
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "75vw" }} >
                        <Paper component="div" sx={{ p: 2, m: 2, width: "95%", bgcolor: "#202020", borderRadius: "10px", }} >
                            <Grid container spacing={3} justifyContent={'center'} >
                                <Grid item xs>
                                    <Grid container spacing={2} sx={{mb: 2, justifyContent: 'center' }}>
                                        <Typography variant='h4' sx={{pt: 2, width: '50%', borderBottom: 1, borderColor: '#16C83D' }}> {loadingGame ? "Carregando jogadores..." : jogo ? `Jogadores de ${jogo.titulo}` : "Jogadores não encontrados"} </Typography>
                                    </Grid>
                                    <PlayerList jogoId={jogoId} filtersUsers={filtersUsers} setLoading={setLoading} loading={loading}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Page;