import React from 'react'
import{NavLink} from 'react-router-dom'


const Info=()=>{
    return(
    <main>
           
        <div className="info">
           
            <div className="info-in">
                <div className="more-info">
                    <h2>More About Us</h2>
                    <p>Trained Mind is a BodySystems company.Our mission is to create a Planet in shape by providing clients with what they are looking for. Success will be a consequence.</p>
                </div>
                <div className="fondo-videoTM">
                    <video autoPlay loop muted id="video">
                        <source src="http://baravdg.com/wp-content/uploads/2021/05/videoHome.mp4" type="video/mp4"></source>
                    </video>          
                </div>                   
            </div>
            <div className="img-rp">
                <img src="http://baravdg.com/wp-content/uploads/2021/05/rbk.png" alt="img-r" className="img-r" />
                <img src="http://baravdg.com/wp-content/uploads/2021/05/ua.png" alt="img-r" className="img-r" />
                <img src="http://baravdg.com/wp-content/uploads/2021/05/ad.png" alt="img-r" className="img-r" />
                <img src="http://baravdg.com/wp-content/uploads/2021/05/nblc.png" alt="img-r" className="img-r" />
            </div>       
            <div  className="information"> 
                <div className="fondo-info">
                        
                    <div className="fondo-txt">

                        <div>
                            <div className="info-ind">
                                <h2>POSTURE <img src="http://baravdg.com/wp-content/uploads/2021/05/postura.png" alt="posture" className="img-info" /></h2>
                                <p>A correct body posture benefits us in our health, avoiding muscular and spinal problems such as scoliosis, lordosis, low back pain among others, it avoids the appearance of muscle pain, keeping the load of our body leveled between the body segments </p>
                            </div>
                            <div className="info-ind">
                                <h2>MOBILITY<img src="http://baravdg.com/wp-content/uploads/2021/05/mover.png" alt="movility" className="img-info" /></h2>
                                <p>The movement that is performed with the joints in the warm-up phase or muscle preparation exercises and so that the joints do not suffer injuries, is known as joint mobility. The body points on which it should be exercised are mainly neck, ankles, hips and shoulders.</p>
                                </div>
                        </div>
                        <div>
                            <div className="info-ind">
                                <h2>STRENGTH<img src="http://baravdg.com/wp-content/uploads/2021/05/d972dfd5993c1212d51d9fa428dab9bd.png" alt="strength" className="img-info" />    </h2>
                                <p>Strength training should be considered vitally important, as it improves your physical condition, well-being, your ability to bear loads, and your overall performance. Elite athletes include it because of the great improvements they get in their performance and also to avoid injury.</p>
                            </div>
                            <div className="info-ind">
                                <h2>CARDIO<img src="http://baravdg.com/wp-content/uploads/2021/05/1546060.png" alt="cardio" className="img-info" /></h2>
                                <p>Cardio helps burn a lot of calories, speeds up our metabolism and improves our Body Mass Index (BMI). Perform cardio exercises on a regular basis that help us maintain our ideal weight. Helps control blood pressure and strengthens the immune system.</p>
                            </div>
                        </div>

                    </div>
                    <div className="img-fem">
                        <img src="http://baravdg.com/wp-content/uploads/2021/05/Fitness-girl-black-sportswear-training-weight-lifting_1920x1440.jpg" alt="img-F" className="img-f" />
                    </div>
                </div>
                
            </div>
        </div>    
        <div className="fondo-inv">
            <div className="cartel-rojo">
                <h4>Live the best virtual experience and train with us.
                Be part of our community.</h4>
                <div className="txt-cartelrojo">
                <div >
                    <p>+50</p>
                    <h5>Students</h5>
                </div>
                <div>
                    <p>+90</p>
                    <h5>Graduates</h5>
                </div>
                <div>
                    <p>+10</p>
                    <h5>Coach</h5>
                </div>
                </div>
            </div>        
        </div>
        <div className="txt-inv">
           <div>
                <h3 className="txt-call">
                Ready to start? I chose the instructorate and let's get started! 
                </h3>
           </div>
           <div>
           <NavLink exact to="/signup" className="center"><p className="btn-home">GO!</p></NavLink>
           </div>
        </div>    
    </main>
    )       
}
export default Info