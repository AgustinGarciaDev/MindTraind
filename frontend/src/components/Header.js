import React from 'react'
import { Nav } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import{NavLink} from 'react-router-dom'

const Header=()=>{
  return (
    <header>
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div>
            <img src="http://baravdg.com/wp-content/uploads/2021/05/tm.png" alt="imagen-home" className="logo" />
        </div>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <NavLink exact to="/">Home</NavLink>
                    <NavLink exact to="/signin" >Sign In</NavLink>
                    <NavLink exact to="/signup">Sign Up</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
)
}


    

           

export default Header