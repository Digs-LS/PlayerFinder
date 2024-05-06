import { createContext, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);
  
  const signin = (email, senha) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    
    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].senha === senha) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ token }));
        setUser(hasUser);
        return;
      } else {
        return(
          <Snackbar open={true} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            <Alert
              severity="warning"
              variant="filled"
              sx={{ width: "100%" }}
            >
              E-mail ou senha incorretos
            </Alert>
          </Snackbar>
        );
      }
    } else {
      return(
        <Snackbar open={true} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
          <Alert
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Usuário não cadastrado
          </Alert>
        </Snackbar>
      );
    }
  };

  const signup = (usuario, nome, email, senha, estado, genero) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return(
        <Snackbar open={true} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
          <Alert
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Já existe uma conta com esse E-mail
          </Alert>
        </Snackbar>
      );
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { usuario, nome, email, senha, estado, genero }];
    } else {
      newUser = [{ usuario, nome, email, senha, estado, genero }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};