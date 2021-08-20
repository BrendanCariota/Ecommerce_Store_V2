import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

// Actions
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    console.log("loutgut");
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Electric Aura</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart headerIcon"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {/* If User is signed in show a dropdown with options */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // If no User is signed in show sign in button
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user headerIcon"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* If User is Signed AND is Admin show admin options */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
