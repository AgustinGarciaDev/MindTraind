import React from 'react'
import { NavLink } from 'react-router-dom'


const Info = () => {
    return (
        <main>

            <div className="info">

                <div className="info-in" style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/rayas-red-izq-1.png')` }}>
                    <div className="more-info">
                        <h2>More About Us</h2>
                        <p>Trained Mind is an online instructors training school. We provide trainee instructors with the best holistic training, integrating mind, body and soul. Success will be a consequence.</p>
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
                <div className="information">
                    <div className="fondo-info">

                        <div className="fondo-txt">

                            <div>
                                <div className="info-ind">
                                    <h2>POSTURE <img src="http://baravdg.com/wp-content/uploads/2021/05/postura.png" alt="posture" className="img-info" /></h2>
                                    <p>A correct body posture benefits us in our health, avoiding muscular and spinal problems such as scoliosis, low back pain among others, it avoids the appearance of muscle pain, keeping the load of our body leveled between the body segments.</p>
                                </div>
                                <div className="info-ind">
                                    <h2>MOBILITY<img src="http://baravdg.com/wp-content/uploads/2021/05/mover.png" alt="movility" className="img-info" /></h2>
                                    <p>The movement that is performed with the joints in the warm-up phase or muscle preparation exercises to avoid injuries, is known as joint mobility. It should be exercised on neck, ankles, hips and shoulders.</p>
                                </div>
                            </div>
                            <div>
                                <div className="info-ind">
                                    <h2>STRENGTH<img src="http://baravdg.com/wp-content/uploads/2021/05/d972dfd5993c1212d51d9fa428dab9bd.png" alt="strength" className="img-info" />    </h2>
                                    <p>Strength training is vitally important, as it improves your physical condition, your ability to bear loads, and your overall performance. Elite athletes include it because of the great improvements they get in their performance and also to avoid injury.</p>
                                </div>
                                <div className="info-ind">
                                    <h2>CARDIO<img src="http://baravdg.com/wp-content/uploads/2021/05/1546060.png" alt="cardio" className="img-info" /></h2>
                                    <p>Cardio helps burn calories,
                                    speed up our metabolism and improve our Body Mass Index (BMI).
                                    It helps us maintain our
                                    ideal weight, control blood pressure and strengthen the immune system.</p>
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
                            <p>+5000</p>
                            <h5>Students</h5>
                        </div>
                        <div>
                            <p>+2000</p>
                            <h5>Graduates</h5>
                        </div>
                        <div>
                            <p>+100</p>
                            <h5>Coaches</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="txt-inv">
                <div>
                    <h3 className="txt-call">
                        Ready to start?
                </h3>
                </div>
                <div>
                    <NavLink exact to="/signup" className="center"><p className="btn-home">CHOOSE YOUR COURSE</p></NavLink>
                </div>
            </div>
        </main>
    )
}
export default Info