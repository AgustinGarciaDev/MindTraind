import React from 'react'
import { Nav } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';

const Header=()=>{
  return (
    <header>
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div>
            <img src="http://baravdg.com/wp-content/uploads/2021/05/logo-1.png" alt="imagen-home" className="logo" />
        </div>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#pricing">Home</Nav.Link>
                    <Nav.Link href="#features">Sign In</Nav.Link>
                    <Nav.Link href="#pricing">Sign Up</Nav.Link>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
)
}

    

           

export default Header