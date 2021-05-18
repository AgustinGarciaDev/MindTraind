import React from 'react'
import { Nav } from "react-bootstrap";
import { Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../redux/actions/usersActions'

const Header = (props) => {
    return (
        <header>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <div>
                    <div className="logo" style={{ backgroundImage: `url('http://baravdg.com/wp-content/uploads/2021/05/logo3.png')` }}>
                    </div>
                </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact to="/"><p className="link">Home</p></NavLink>
                        {
                            !props.userLogged.userLogged
                            &&
                            (
                                <>
                                    <NavLink exact to="/signin"><p className="link">Sign In</p></NavLink>
                                    <NavLink exact to="/signup"><p className="link">Sign Up</p></NavLink>
                                </>
                            )
                        }
                        {
                            props.userLogged.userLogged && props.userLogged.userLogged.role === 'admin'
                            &&
                            <>
                                <NavLink exact to="/admin"><p className="link">Admin</p></NavLink>
                                <NavLink exact to="/dashboard"><p className="link">Dashboard</p></NavLink>
                                <NavLink exact to="/courselist"><p className="link">Course list</p></NavLink>
                                <NavLink exact to="/jobs"><p className="link">Jobs</p></NavLink>
                                <NavLink exact to="/chat"><p className="link">Chat</p></NavLink>
                            </>
                        }
                        {
                            props.userLogged.userLogged && props.userLogged.userLogged.role === 'student'
                            &&
                            <>
                                <NavLink exact to="/dashboard"><p className="link">Dashboard</p></NavLink>
                                <NavLink exact to="/courselist"><p className="link">Course list</p></NavLink>
                                <NavLink exact to="/jobs"><p className="link">Jobs</p></NavLink>
                                <NavLink exact to="/chat"><p className="link">Chat</p></NavLink>
                            </>
                        }

                        {
                            props.userLogged.userLogged && props.userLogged.userLogged.role === 'coach'
                            &&
                            <>
                                <NavLink exact to="/dashboard"><p className="link">Dashboard</p></NavLink>
                                <NavLink exact to="/courselist"><p className="link">Course list</p></NavLink>
                                <NavLink exact to="/jobs"><p className="link">Jobs</p></NavLink>
                                <NavLink exact to="/chat"><p className="link">Chat</p></NavLink>
                            </>
                        }
                        {
                            props.userLogged.userLogged
                            &&
                            <p className="link" onClick={props.signOut}>Sign out</p>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.user
    }
}

const mapDispatchToProps = {
    signOut: userActions.logOutUser
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)