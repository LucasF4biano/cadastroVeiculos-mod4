import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/LoginStyle.css";  // Importa estilo específico para o login

const Login = ({ setUsuarioLogado }) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (usuario === "admin" && senha === "1234") {
      setUsuarioLogado(usuario);
      navigate("/cadastro-veiculo");
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <h2 className="login-title">Login</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="joaosilva123"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="senha123"
            />
          </Form.Group>

          <Button onClick={handleLogin} variant="primary" className="w-100">
            Entrar
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
