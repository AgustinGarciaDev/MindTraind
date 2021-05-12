import React from 'react'
import{NavLink} from 'react-router-dom'

const Footer=()=>{
    return(
 <div>
    <div>   
        <div  className="footer">
            <div className="social">
                <img src="http://baravdg.com/wp-content/uploads/2021/05/fb.png" alt="facebook" className="img-social"/>
                <img src="http://baravdg.com/wp-content/uploads/2021/05/inst.png" alt="instangram" className="img-social"/>
                <img src="http://baravdg.com/wp-content/uploads/2021/05/wsp.png" alt="whatsapp" className="img-social"/>
            </div>
            <div className="link-footer">
                <NavLink exact to="/"><h2 className="link">Home</h2></NavLink>
                <NavLink exact to="/signup"><h2 className="link">signup</h2></NavLink>
                <NavLink exact to="/signin"><h2 className="link">signin</h2></NavLink>
                <NavLink exact to="/dashboard"><h2 className="link">dashboard</h2></NavLink>
            </div> 
        </div>
           
     </div>
</div>
    )
}
export default Footer