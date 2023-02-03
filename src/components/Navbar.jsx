import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import getConfig from "../utils/getConfig";
import CartSidebar from "./CartSidebar";

const AppNavbar = () => {

  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }


  return (
    <>
      <Navbar expand="lg" variant="dark" bg="primary" size="lg">
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to="/">
            Ecommers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-init">
              <Button>
                {
                  !localStorage.getItem('token') ?
                    <Nav.Link as={Link} to="/login">
                      <i className="fa-solid fa-user"></i>
                    </Nav.Link> :
                    <Nav.Link onClick={logout} >
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </Nav.Link>
                }
              </Button>
              <Button>
                <Nav.Link as={Link} to="/purchases">
                  <i className="fa-solid fa-store"></i>
                </Nav.Link>
              </Button>
              <Button onClick={handleShow}>
                <Nav.Link><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartSidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default AppNavbar;
