import React from 'react'
import{NavLink} from 'react-router-dom'

const Footer=()=>{
    return(
 <div>
    <div>   
        <div  className="footer">
            <div className="social">
                <i class="fab fa-facebook-square"></i>
                <i class="fab fa-whatsapp-square"></i>
                <i class="fab fa-instagram-square"></i>
            </div>
            <div className="link-footer">
                <NavLink exact to="/"><p className="link">Home</p></NavLink>
                <NavLink exact to="/signup"><p className="link">signup</p></NavLink>
                <NavLink exact to="/signin"><p className="link">signin</p></NavLink>
                <NavLink exact to="/dashboard"><p className="link">dashboard</p></NavLink>
            </div> 
        </div>
           
     </div>
</div>
    )
}
export default Footer