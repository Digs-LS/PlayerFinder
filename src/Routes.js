import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import Jogos from "./pages/Jogos";
import ProcurarJogadores from "./pages/ProcurarJogadores";
import AdicionarJogo from "./pages/AdicionarJogo";
import useAuth from "./hooks/useAuth";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  return signed > 0 ? <Item /> : <Login />;
};

// eslint-disable-next-line
export default () => {
  return (
    <Fragment>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route exact path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Login />} />
        <Route exact path="/inicio" element={<Private Item={Inicio} />} />
        <Route exact path="/jogos" element={<Private Item={Jogos} />} />
        <Route exact path="/jogos/valorant" element={<Private Item={ProcurarJogadores} />} />
        <Route exact path="/perfil" element={<Private Item={Perfil} />} />
        <Route exact path="/adicionar-jogo" element={<Private Item={AdicionarJogo} />} />
      </Routes>
    </Fragment>
  );
};
