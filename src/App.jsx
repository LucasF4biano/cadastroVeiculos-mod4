import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "./components/Menu";
import CadastroVeiculo from "./components/CadastroVeiculo";
import CadastroFornecedor from "./components/CadastroFornecedor";
import Login from "./components/Login";
import './App.css'; 

const App = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  return (
    <Router>
      <Menu usuario={usuarioLogado} setUsuarioLogado={setUsuarioLogado} />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={usuarioLogado ? <Navigate to="/cadastro-veiculo" /> : <Login setUsuarioLogado={setUsuarioLogado} />} />
          <Route path="/login" element={usuarioLogado ? <Navigate to="/cadastro-veiculo" /> : <Login setUsuarioLogado={setUsuarioLogado} />} />
          <Route 
            path="/cadastro-veiculo" 
            element={usuarioLogado ? <CadastroVeiculo /> : <Navigate to="/" />} 
          />
          <Route 
            path="/cadastro-fornecedor" 
            element={usuarioLogado ? <CadastroFornecedor /> : <Navigate to="/" />} 
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
