import React from 'react'
import { Nav } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import{NavLink} from 'react-router-dom'

const Header=()=>{
  return (
    <header>
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div>
            <img src="http://baravdg.com/wp-content/uploads/2021/05/logo3.png" alt="imagen-home" className="logo" />
        </div>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <NavLink exact to="/"><p className="link">Home</p></NavLink>
                    <NavLink exact to="/signin"><p className="link">Sign In</p></NavLink>
                    <NavLink exact to="/signup"><p className="link">Sign Up</p></NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
)
}


    

           

export default Header