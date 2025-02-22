import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Menu = ({ usuario, setUsuarioLogado }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsuarioLogado(null);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">LuketeCar</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu" />
        <Navbar.Collapse id="menu">
          <Nav className="me-auto">
            {usuario && <Nav.Link as={Link} to="/cadastro-veiculo">Cadastro de Veículo</Nav.Link>}
            {usuario && <Nav.Link as={Link} to="/cadastro-fornecedor">Cadastro de Fornecedor</Nav.Link>}
          </Nav>
          <Navbar.Text className="d-flex align-items-center">
            {usuario ? (
              <>
                <span className="me-2">Logado: {usuario}</span>
                <NavDropdown title="Opções" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout} style={{ color: '#000' }}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
