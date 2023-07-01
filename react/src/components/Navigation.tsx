import React, {useEffect} from 'react';
import {Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import logo from '../assets/world.png';
import {User, useStateContext} from "../context/ContextProvider.tsx";
import {useNavigate} from "react-router-dom";
import axiosClient from "../../axios-client.ts";

function Navigation() {
  const {token, user, setUser, setToken} = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

  async function handleLogout(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
    navigate('/');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} style={{width: 50, height: 50}}/>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <LinkContainer to="/posts">
                <Nav.Link>Posts</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!token && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Log in</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
              </>
            )}
            {token && (
              <NavDropdown
                style={{position: 'relative'}}
                title={(user as User)?.name ?? ""}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="danger"
                    style={{
                      width: '100%',
                      margin: '0',
                    }}
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
