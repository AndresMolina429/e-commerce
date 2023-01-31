import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {

  const navigate = useNavigate()

       const logout = () => {
        localStorage.removeItem('token');
        navigate('/')
       }

  return (
    <Navbar expand="lg" variant="dark" bg="primary" size="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ecommers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/purchases">
              Purchases
            </Nav.Link>
            <Nav.Link> (Cart)</Nav.Link>
            <Nav.Link onClick = {logout} >
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
