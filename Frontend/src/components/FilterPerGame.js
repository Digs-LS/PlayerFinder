import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Drawer
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const FilterPerGame = ({ jogoId, atributos = [],setLoading, setFiltersUsers, loading  }) => {
  const [filters, setFilters] = useState({ username: "" });

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/jogo/filter/usuario?jogoId=${jogoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(filters)
      });

      if (response.ok) {
        const data = await response.json();
        setFiltersUsers(data)

      } else {
        throw new Error("Erro ao filtrar perfil de jogo");
      }
    } catch (error) {
      console.error("Erro ao filtrar perfil de jogo:", error);
    }
    finally{
      setLoading(false)
    }
  };

  const groupedAttributes = atributos.reduce((acc, curr) => {
    if (!acc[curr.titulo]) {
      acc[curr.titulo] = [];
    }
    acc[curr.titulo].push(curr);
    return acc;
  }, {});

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: "2vh", display: "flex", flexDirection: "column", alignItems: "center", textAlign: 'center', color: "white", }}>
          <Typography component="h1" variant="h4" sx={{ width: '80%', mt: 3 , borderBottom: 1, borderColor: '#16C83D'}}>
            Filtrar jogadores
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{mt: 5}}>
            <div style={{ display: "flex", flexDirection: "row", width: "20vw", justifyContent: "center", }}>
              <div style={{width: "100%",}}>
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel htmlFor="username-input">Nome de Usuário</InputLabel>
                  <Input
                    id="username-input"
                    name="username"
                    value={filters.username}
                    onChange={handleFilterChange}
                    style={{
                      marginBottom:"15px"
                    }}
                  />
                </FormControl>
                <Grid container spacing={3}>
                  {Object.keys(groupedAttributes).map((titulo) => (
                    <Grid item xs={12} key={titulo}>
                      <FormControl sx={{ minWidth: "100%" }}>
                        <InputLabel id={`${titulo}-label`}>
                          {titulo}
                        </InputLabel>
                        <Select
                          labelId={`${titulo}-label`}
                          label={titulo}
                          name={titulo}
                          value={filters[titulo] || ""}
                          onChange={handleFilterChange}
                        >
                          {groupedAttributes[titulo].map((attr) => (
                            <MenuItem key={attr.value} value={attr.value}>
                              {attr.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>

            <Button type="submit" variant="contained" sx={{ mt: 5, width: "10vw", color: "white", bgcolor: "#16C83D", "&:hover":{bgcolor:'#32D35A'}, }}>
              {loading ? (<CircularProgress sx={{ height: "10px", height: "10px" }} /> ) : ( "Filtrar")} 
            </Button>          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} sx={{ color: 'white', bgcolor: '#16C83D', "&:hover":{bgcolor:'#32D35A'} }}>Filtros</Button>
      <Drawer open={open} anchor='right' onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default FilterPerGame;
