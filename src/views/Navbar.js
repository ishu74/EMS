import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const NavbarTodo = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser');
  const location = useLocation();
  const isOnLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
    toast.info("Logged out Successfully!")
  };

  const handleLoginClick = () => {
    navigate('/login');
    toast.success("Logged in Successfully!")
  };
  return (
    <>
      <Navbar bg="black" data-bs-theme="dark" sticky="top">
        <Container>
          {currentUser ? <Navbar.Brand as={Link} to="/">EMS</Navbar.Brand> :
            <Navbar.Brand as={Link} to="/" >Employee Management System</Navbar.Brand>}

          <Nav className="me-auto">
            {
              currentUser ?
                <>
                  <Nav.Link as={Link} to="/add">ADD</Nav.Link>
                  <Nav.Link as={Link} to="/table">Table</Nav.Link>
                  <Nav.Link as={Link} to="/card">Cards</Nav.Link>
                </> :
                <>
                  {/* <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link> */}
                  {/* <Nav.Link as={Link} to="/reset-password">Update Password</Nav.Link> */}
                </>
            }


          </Nav>
          {!isOnLoginPage && (currentUser ? (
            <Button variant="danger" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) :
            <Button variant="primary" size="sm" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarTodo;
