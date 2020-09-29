import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styled from 'styled-components';

import SignOut from './SignOut';
import AuthUserContext from '../contexts/AuthUserContext';

const StyledNavbar = styled.div`
    a, .navbar-light .navbar-nav .nav-link {
        color: #212529;
    }

    div a {
        font-size: 1.3rem;
    }

    .brand {
        font-size: 3rem;
    }
    border: 0;    
    box-shadow: none;
    .navbar.navbar-default {
        background-color: #99ccff;
        border: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .navbar.navbar-default .navbar-collapse {
        border: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
`;


const NavbarComponent = ({ authUser }) => {
    const [scroll, setScroll] = useState(false);

    const NavigationAuth = () => {
        return (
            <Navbar className={scroll ? "fixed-top mx-5 scrolled page-navbar" : "fixed-top mx-5 page-navbar"}  expand="lg">
                <Navbar.Brand className="brand">
                    <Nav.Link as={Link} to="/"><strong>Weather</strong></Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/account">Account</Nav.Link>
                    <Nav.Link as={Link} to="/bookmarks">Bookmarks</Nav.Link>
                    <SignOut />
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    
    const NavigationNonAuth = () => {
        return (
            <Navbar className={scroll ? "fixed-top mx-5 scrolled page-navbar" : "fixed-top mx-5 page-navbar"}  expand="lg">
                <Navbar.Brand className="brand">
                    <Nav.Link as={Link} to="/"><strong>Weather</strong></Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }


  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.pageYOffset > 5
      if (scrollCheck) {
        return setScroll(true);
      }

      return setScroll(false);
    })
  }, [scroll])
    
    return (
        <StyledNavbar>
            <AuthUserContext.Consumer>
                {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
            </AuthUserContext.Consumer>
        </StyledNavbar>
    )
}

export default NavbarComponent;