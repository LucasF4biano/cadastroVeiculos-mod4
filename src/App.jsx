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

  // Função que verifica se o usuário está logado, redirecionando para o login, caso não esteja
  const ProtectedRoute = ({ children }) => {
    if (!usuarioLogado) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Menu usuario={usuarioLogado} setUsuarioLogado={setUsuarioLogado} />
      <Container className="mt-4">
        <Routes>
          {/* Página de Login, redireciona para o cadastro caso já esteja logado */}
          <Route path="/" element={usuarioLogado ? <Navigate to="/cadastro-veiculo" /> : <Login setUsuarioLogado={setUsuarioLogado} />} />
          <Route path="/login" element={usuarioLogado ? <Navigate to="/cadastro-veiculo" /> : <Login setUsuarioLogado={setUsuarioLogado} />} />

          {/* Rota protegida para cadastro de veículos */}
          <Route
            path="/cadastro-veiculo"
            element={
              <ProtectedRoute>
                <CadastroVeiculo />
              </ProtectedRoute>
            }
          />

          {/* Rota protegida para cadastro de fornecedores */}
          <Route
            path="/cadastro-fornecedor"
            element={
              <ProtectedRoute>
                <CadastroFornecedor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
