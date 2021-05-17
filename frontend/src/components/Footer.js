import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div>
                <div className="footer">
                    <div className="social">
                        <i className="fab fa-facebook-square"></i>
                        <i className="fab fa-whatsapp-square"></i>
                        <i className="fab fa-instagram-square"></i>
                        <i className="fab fa-discord"></i>
                    </div>
                    <div className="link-footer">
                        <NavLink exact to="/"><p className="link">Home</p></NavLink>
                        <NavLink exact to="/signup"><p className="link">Sign Up</p></NavLink>
                        <NavLink exact to="/signin"><p className="link">Sign In</p></NavLink>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Footer