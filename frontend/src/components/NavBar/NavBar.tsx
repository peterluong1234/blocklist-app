import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { User } from "../../models/user";
import React, { useState } from "react";
import * as userService from "../../utilities/users-service";

interface NavBarProps {
    setUser: (user: User | null) => void;
    user: User | null;
}

const NavBar: React.FC<NavBarProps> = ({setUser, user}) => {
    const handleLogout = () => {
        userService.logout();
        setUser(null);
        console.log('hello');
    }
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Blocklist App
                </Navbar.Brand>
                { user ?
                    <Nav.Link href="/" onClick={handleLogout}>Log Out</Nav.Link>
                    :
                    <Nav.Link href="/">Log In/Sign Up</Nav.Link>
                }
            </Container>
        </Navbar>
    )
}

export default NavBar;