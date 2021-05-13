import { Nav } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

const NavBarDashBoard = () => {

    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home"><img className="logoDashBoard" src="http://baravdg.com/wp-content/uploads/2021/05/tm.png" alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#pricing"><img className="DashBoardfotoUsuario" src="http://baravdg.com/wp-content/uploads/2021/04/46.jpg" alt="" /></Nav.Link>
                        <NavDropdown title="Settings" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Beneficios</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default NavBarDashBoard