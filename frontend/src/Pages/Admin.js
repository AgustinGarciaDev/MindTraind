import AsideNav from "../components/AsideNav"
import Header from '../components/Header'
import CourseContainer from "../components/CourseContainer"
import NewCourse from "../components/NewCourse"
import { useState } from "react"
import NewJob from "../components/NewJob"

const Admin = () => {
    const [show, setShow] = useState()

    return (
        <>
            <div className="contenedorMenu">
                <AsideNav />
                <div className="contenedorWeb">
                    <Header />
                    <div className="adminContainer">
                        {!show &&
                            (
                                <div className="selectCardContainer">
                                    <div className="selectCard" onClick={() => setShow(<CourseContainer setShow={setShow} />)} style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/pexels-victor-freitas-841130-scaled.jpg')` }}>
                                        <h3>Courses</h3>
                                    </div>
                                    <div className="selectCard" onClick={() => setShow(<NewCourse setShow={setShow} />)} style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/pexels-estudio-polaroid-3112004-scaled.jpg')` }}>
                                        <h3>New course</h3>
                                    </div>
                                    <div className="selectCard" onClick={() => setShow(<NewCourse setShow={setShow} />)} style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/pexels-estudio-polaroid-3112004-scaled.jpg')` }}>
                                        <h3>Jobs</h3>
                                    </div>
                                    <div className="selectCard" onClick={() => setShow(<NewJob setShow={setShow} />)} style={{ backgroundImage: `url('http://baravdg.com/wp-content/uploads/2021/05/pexels-lukas-669584-scaled.jpg')` }}>
                                        <h3>New job</h3>
                                    </div>
                                </div>
                            )}
                        {show}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin