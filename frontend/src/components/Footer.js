import React from 'react'
import{NavLink} from 'react-router-dom'

const Footer=()=>{
    return(
 <div>
    <div>   
        <div  className="footer">
            <div className="social">
                <img src="" alt="facebook" className="img-social"/>
                <img src="" alt="instangram" className="img-social"/>
                <img src="" alt="whatsapp" className="img-social"/>
            </div>
            <div className="link-footer">
                <NavLink exact to="/"><h2 className="link">Home</h2></NavLink>
                <NavLink exact to="/signup"><h2 className="link">signup</h2></NavLink>
                <NavLink exact to="/signin"><h2 className="link">signin</h2></NavLink>
                <NavLink exact to="/dashboard"><h2 className="link">dashboard</h2></NavLink>
            </div> 
        </div>
            <div className="name">
                <p>choclazo</p>
                <p>COHORT 3 - MINDHUB</p>
            </div>
     </div>
</div>
    )
}
export default Footer