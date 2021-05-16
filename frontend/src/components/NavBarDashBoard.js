import { Nav } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import usersActions from "../redux/actions/usersActions"
import { connect } from "react-redux";

const NavBarDashBoard = (props) => {

    const desloguear = () => {
        props.logOutUser()

    }


    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img className="logoDashBoard" src="http://baravdg.com/wp-content/uploads/2021/05/tm.png" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#pricing">
                            <div className="fotoProfesor" style={{ backgroundImage: `url("${props.userLogged.profilePicture}")` }}></div>
                        </Nav.Link>
                        <NavDropdown title="Settings" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Beneficios</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav.Link href="#pricing">
                        <p onClick={desloguear} className="logout">SIGN OUT</p>
                    </Nav.Link>

                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.user.userLogged,

    }
}


const mapDispatchToProps = {

    logOutUser: usersActions.logOutUser
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBarDashBoard)
