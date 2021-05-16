import AsideNav from "../components/AsideNav"
import Header from '../components/Header'
import { useEffect } from "react"
import { NavLink } from 'react-router-dom'

const Admin = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className="contenedorMenu">
                <AsideNav />
                <div className="contenedorWeb">
                    <Header />
                    <div className="adminContainer" style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/rayas-red-izq-1.png')` }}>
                        <div className="selectCardContainer">
                            <NavLink className="selectCard" to={"/EditCourse"} style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/pexels-victor-freitas-841130-scaled.jpg')` }}>
                                <h3>Courses</h3>
                            </NavLink>
                            <NavLink className="selectCard" to={"/NewCourse"} style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/pexels-estudio-polaroid-3112004-scaled.jpg')` }}>
                                <h3>New course</h3>
                            </NavLink>
                            <NavLink className="selectCard" to={"/EditJobs"} style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/pexels-estudio-polaroid-3112004-scaled.jpg')` }}>
                                <h3>Jobs</h3>
                            </NavLink>
                            <NavLink className="selectCard" to={'/NewJob'} style={{ backgroundImage: `url('http://baravdg.com/wp-content/uploads/2021/05/pexels-lukas-669584-scaled.jpg')` }}>
                                <h3>New job</h3>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin