import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Container,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Collapse,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [jogosNoPerfil, setJogosNoPerfil] = useState([]);
  const [perfilJogosLoaded, setPerfilJogosLoaded] = useState(false);
  const [profilesGames, setProfilesGames] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchJogosNoPerfil();
    fetchProfilesGames();
  }, []);

  const fetchJogosNoPerfil = async () => {
      setLoading(true);
      try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/perfil/jogos/meus-jogos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setJogosNoPerfil(data);
        setPerfilJogosLoaded(true);
      } else {
        throw new Error("Erro ao listar os jogos do perfil");
      }
    } catch (error) {
      console.error("Erro ao listar os jogos do perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfilesGames = async () => {
      setLoading(true);
      try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/perfil/jogos/perfil-jogos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfilesGames(data);
      } else {
        throw new Error("Erro ao listar os perfil dos jogo");
      }
    } catch (error) {
      console.error("Erro ao listar os perfil dos jogos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGame = async (jogoId) => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/jogo/perfil/delete`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            jogoId,
            }),
        });

      if (response.ok) {
        console.log("Perfil de jogo excluído com sucesso!");
        fetchProfilesGames();
        fetchJogosNoPerfil();
      } else {
        const data = await response.json();
        console.error("Erro ao excluir perfil de jogo:", data.message);
      }
    } catch (error) {
      console.error("Erro ao excluir perfil de jogo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: "2vh", display: "flex", flexDirection: "column", alignItems: "center", color: "white", }}>
            <Avatar sx={{ m: 1, bgcolor: "#16C83D" }}>
                <SportsEsportsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Meus Jogos
            </Typography>
            {loading ? (
                <CircularProgress style={{ color: "#16C83D", marginTop: "20px" }} />
            ) : (<>
                <Box component="div" sx={{ mt: 1, display: "flex", flexDirection: "column", width: "90vw", alignItems: "center", }}>
                    {perfilJogosLoaded && (
                        <TableContainer component={Paper} sx={{ p: "1%", m: "1%", width: "50vw", bgcolor: "#202020", borderRadius: "10px", mt: "2%", }}>
                            <Typography variant="h6" style={{color: "white", marginBottom: "1%"}}>
                            Jogos no Perfil
                            </Typography>
                            <Table size="small">
                                {jogosNoPerfil.map((jogo) => (
                                    <><TableRow key={jogo.id}>
                                        <TableCell>
                                            <IconButton size="small" onClick={() => setOpen(!open)}>
                                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{jogo.titulo}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Deletar jogo do perfil">
                                                <IconButton sx={{ color: "red" }} onClick={() => handleDeleteGame(jogo.id)}>
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{pb: 0, pt: 0}} colSpan={6}>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Paper component="div" sx={{ p: 2, m: 1, borderRadius: "10px", }}>
                                                        <Typography variant="h6"> {jogo.titulo} </Typography>
                                                        <Table size="small">
                                                            <TableCell sx={{borderColor: '#16C83D'}}>teste</TableCell>
                                                        </Table>
                                                    </Paper>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow></>
                                ))}
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </>)}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Page;