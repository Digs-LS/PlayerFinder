import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Grid, Paper, CircularProgress, Tooltip, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PendingIcon from '@mui/icons-material/Pending';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import useFriends from '../hooks/useFriends';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState({});
  const { sendFriendRequest, fetchFriendRequests, fetchFriends } = useFriends();
  const { user } = useAuth();
  const api = "http://localhost:8080";

  const currentUser = user;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${api}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.filter(userD => userD.id !== user.id)
          setUsers(filteredUsers);

        } else {
          throw new Error("Erro ao listar usuários");
        }
      } catch (error) {
        console.error(error);
        setError("Erro ao listar usuários: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFriendRequests();
        if (data && Array.isArray(data)) {
          const pendingIds = data.map(request => {
            if (request.user.id === currentUser.id || request.friend.id === currentUser.id) {
              return request.user.id === currentUser.id ? request.friend.id : request.user.id;
            }
            return null;
          }).filter(id => id !== null);

          setPendingRequests(pendingIds);
        } else {
          throw new Error("Resposta da API não possui o formato esperado");
        }
      } catch (error) {
        console.error("Erro ao buscar pedidos de amizade:", error);
        setError("Erro ao buscar pedidos de amizade: " + error.message);
      }
    };

    fetchData();
  }, [currentUser.id], fetchFriendRequests);

  useEffect(() => {
    const fetchFriendsList = async () => {
      try {
        const data = await fetchFriends();
        if (data && Array.isArray(data)) {
          setFriends(data);
        } else {
          throw new Error("Resposta da API não possui o formato esperado");
        }
      } catch (error) {
        console.error("Erro ao buscar lista de amigos:", error);
        setError("Erro ao buscar lista de amigos: " + error.message);
      }
    };

    fetchFriendsList();
  }, []);

  const handleSendFriendRequest = async (userId) => {
    try {
      setRequestStatus(prevStatus => ({ ...prevStatus, [userId]: 'loading' }));
      await sendFriendRequest(userId);
      const updatedRequests = await fetchFriendRequests();
      if (updatedRequests && Array.isArray(updatedRequests)) {
        const pendingIds = updatedRequests.map(request => {
          if (request.user.id === currentUser.id || request.friend.id === currentUser.id) {
            return request.user.id === currentUser.id ? request.friend.id : request.user.id;
          }
          return null;
        }).filter(id => id !== null);
        setPendingRequests(pendingIds);
      }
      setRequestStatus(prevStatus => ({ ...prevStatus, [userId]: 'success' }));
    } catch (error) {
      console.error("Erro ao enviar pedido de amizade:", error);
      setRequestStatus(prevStatus => ({ ...prevStatus, [userId]: 'error' }));
      if (error.response && error.response.status === 500) {
        setError("Erro interno ao enviar pedido de amizade. Tente novamente mais tarde.");
      } else if (error.response && error.response.status === 400 && error.response.data && error.response.data.message === "Já existe um pedido de amizade pendente entre os usuários.") {
        setError("Já existe um pedido de amizade pendente entre os usuários.");
      } else {
        setError("Erro ao enviar pedido de amizade. Tente novamente mais tarde.");
      }
    }
  };

  const isRequestPending = (userId) => {
    return pendingRequests.includes(userId);
  };

  const isFriend = (userId) => {
    return friends.some(friendship => friendship.user.id === userId || friendship.friend.id === userId);
  };

  if (loading) {
    return <Typography variant="h6" mt={2}>Carregando...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <List sx={{ width: '100%' }}>
    <Grid container spacing={2} sx={{justifyContent: 'center', maxHeight: '46vh', overflowY: 'scroll', }}>
      {users.length === 0 ? (
        <Typography variant="h6" sx={{mt: 25}}>Nenhum usuário encontrado.</Typography>
      ) : (
        users.map((user) => (
          <Grid item key={user.id} xs={12}>
            <Paper sx={{ p: 1.5 }}>
              <React.Fragment key={user.id}>
                <ListItem alignItems="flex-start">
                  <Avatar src={user.avatar} alt={user.username} sx={{mr: 1}} />
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ display: 'inline', fontSize: '30px' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {user.username}
                      </Typography>
                    }
                  />
                  {isFriend(user.id) ? (
                    <IconButton disableRipple> 
                      <Tooltip title="Amigo">
                        <PeopleAltIcon/>
                      </Tooltip>
                    </IconButton>  
                  ) : (
                    requestStatus[user.id] === 'loading' ? (
                      <IconButton disableRipple> 
                        <Tooltip title="Enviando pedido de amizade">
                          <CircularProgress size={24} color="inherit" />
                        </Tooltip>
                      </IconButton>  
                    ) : (
                      isRequestPending(user.id) ?
                      <IconButton disableRipple> 
                        <Tooltip title="Pedido de amizade pendente">
                          <PendingIcon/>
                        </Tooltip>
                      </IconButton>  
                      : 
                      <IconButton
                        variant="contained"
                        onClick={() => isRequestPending(user.id) || requestStatus[user.id] === 'loading' ? false : handleSendFriendRequest(user.id)}
                      >
                        <Tooltip title="Enviar pedido de amizade">
                          <PersonAddIcon/>
                        </Tooltip>
                      </IconButton>
                    )
                  )}
                  <IconButton
                    component={Link}
                    to={`/perfil/${user.username}`}
                    sx={{ ml: 1 , color: 'white', bgcolor: '#16C83D', "&:hover": {color: 'white', bgcolor: '#32D35A'} }}
                  >
                    <Tooltip title="Ver perfil">
                      <OpenInNewIcon sx={{ display: 'inline'}} />
                    </Tooltip>
                  </IconButton>
                </ListItem>
                <Divider variant="inset" component="li" sx={{ marginLeft: '0', bgcolor: '#16C83D' }} />
              </React.Fragment>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
    </List>
  );
};

export default UsersList;
