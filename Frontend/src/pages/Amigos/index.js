import React, { useState, useEffect } from "react";
import { Avatar, Box, Typography, Container, Paper, CircularProgress, Grid, ListItem, ListItemText, IconButton, Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Link } from "react-router-dom";
import useFriends from "../../hooks/useFriends";
import useAuth from "../../hooks/useAuth";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Page = () => {
  const { fetchFriends, deleteFriend } = useFriends();
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const result = await fetchFriends();
        setFriends(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFriends();
  }, [fetchFriends]);

  const handleDeleteFriend = async (friendId) => {
    try {
      await deleteFriend(friendId);
      const updatedFriends = friends.filter(friend => friend.user.id !== friendId && friend.friend.id !== friendId);
      setFriends(updatedFriends);
    } catch (error) {
      setError(error);
    }
  };

  const userId = user.id;

  const acceptedFriends = friends.filter(friendship => friendship.user.id === userId);
  const sentFriends = friends.filter(friendship => friendship.friend.id === userId);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: "2vh", display: "flex", flexDirection: "column", alignItems: "center", color: "white" }}>
          <Avatar sx={{ m: 1, bgcolor: "#16C83D" }}>
            <PeopleAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Amigos
          </Typography>
          <Box component="div" sx={{ mt: 1 }}>
            {isLoading ? (
              <CircularProgress color="inherit" />
            ) : error ? (
              <Typography variant="body1" color="error">
                Erro: {error.message}
              </Typography>
            ) : (

                <Grid container sx={{ width: "40vw", mt: 3 }} >
                  <Grid xs>
                    <Paper component="div" sx={{ p: 2, m: 2, bgcolor: "#202020", borderRadius: "10px" }}>
                      <Grid container spacing={2} justifyContent={'center'} mb={2}>
                          <Typography variant='h4' sx={{pt: 2, borderBottom: 1, borderColor: '#16C83D', width: '50%'}}> Meus amigos </Typography>
                      </Grid>
                      {/* <Typography variant="h5" sx={{mt: 5}}> Você não tem amigos! <br/> <SentimentVeryDissatisfiedIcon fontSize="large"/> </Typography> */}
                      {acceptedFriends.map(friendship => (
                        <Grid item key={friendship.user.username} xs={12} paddingBottom={2}>
                          <Paper sx={{ p: 1.5 }}>
                            <React.Fragment key={friendship.user.username}>
                              <ListItem sx={{pt: 2, alignItems: 'flex-start', borderBottom: 1, borderColor: '#16C83D', width: '100%'}} >
                                <Avatar src={user.avatar} alt={friendship.friend.username} sx={{mr: 1}} />
                                <ListItemText
                                  primary={
                                    <Typography
                                      sx={{ display: 'inline', fontSize: '30px' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {friendship.friend.username}
                                    </Typography>
                                  }
                                />
                                <IconButton onClick={() => handleDeleteFriend(friendship.friend.id)}> 
                                  <Tooltip title="Remover amizade">
                                    <PersonRemoveIcon sx={{color: 'red'}} />
                                  </Tooltip>
                                </IconButton>  
                                <IconButton component={Link} to={`/perfil/${friendship.friend.username}`} sx={{ ml: 1 , color: 'white', bgcolor: '#16C83D', "&:hover": {color: 'white', bgcolor: '#32D35A'}, }}>
                                  <Tooltip title="Ver perfil">
                                    <OpenInNewIcon sx={{ display: 'inline'}} />
                                  </Tooltip>
                                </IconButton>
                              </ListItem>
                            </React.Fragment>
                          </Paper>
                        </Grid>
                      ))}
                      {sentFriends.map(friendship => (
                        <Grid item key={friendship.user.username} xs={12}>
                          <Paper sx={{ p: 1.5 }}>
                            <React.Fragment key={friendship.user.username}>
                              <ListItem sx={{pt: 2, alignItems: 'flex-start', borderBottom: 1, borderColor: '#16C83D', width: '100%'}} >
                                <Avatar src={user.avatar} alt={friendship.user.username} sx={{mr: 1}} />
                                <ListItemText
                                  primary={
                                    <Typography
                                      sx={{ display: 'inline', fontSize: '30px' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {friendship.user.username}
                                    </Typography>
                                  }
                                />
                                <IconButton onClick={() => handleDeleteFriend(friendship.user.id)}> 
                                  <Tooltip title="Remover amizade">
                                    <PersonRemoveIcon sx={{color: 'red'}} />
                                  </Tooltip>
                                </IconButton>  
                                <IconButton component={Link} to={`/perfil/${friendship.user.username}`} sx={{ ml: 1 , color: 'white', bgcolor: '#16C83D', "&:hover": {color: 'white', bgcolor: '#32D35A'}, }}>
                                  <Tooltip title="Ver perfil">
                                    <OpenInNewIcon sx={{ display: 'inline'}} />
                                  </Tooltip>
                                </IconButton>
                              </ListItem>
                            </React.Fragment>
                          </Paper>
                        </Grid>
                      ))}
                    </Paper>
                  </Grid>
                </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Page;