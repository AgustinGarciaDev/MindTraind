import React, { useEffect, useState } from 'react';
import NavBarDashBoard from '../components/NavBarDashBoard'
import CourseCard from '../components/CourseCard'
import AsideNav from '../components/AsideNav'
import { connect } from 'react-redux'
import coursesActions from '../redux/actions/coursesActtions';
import { showToast, showTostError500 } from '../helpers/myToast'
import { Link } from 'react-router-dom'
import { Spinner } from "react-bootstrap";
const Dashboard = ({ getCoursesByIdStudent, userLogged }) => {
    const [studentCourses, setStudentCourses] = useState([])
    const [loading, setLaoding] = useState(true)

    async function fetchAPI() {
        if (userLogged) {
            try {
                let data = await getCoursesByIdStudent(userLogged.token)
                data.success ? setStudentCourses(data.response) : showToast("error", data.error)
                setLaoding(false)
            } catch (err) {
                console.log(err)
                showTostError500();
            }
        }
    }
    useEffect(() => {
        fetchAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {

        return (
            <div className="loader">
                <Spinner animation="border" role="status" />
            </div>
        )
    }
    return (
        <div className="contenedorMenu">
            <div className="asideContainer">
                <AsideNav />
            </div>
            <div className="contenedorWeb">
                <NavBarDashBoard />
                {studentCourses.length === 0
                    ? <>
                        <div className="ContenedorPresentacion">
                            <video className="videoDash" autoPlay loop muted >
                                <source src="http://baravdg.com/wp-content/uploads/2021/05/pexels-produtora-midtrack-6509537-1.mp4" type="video/mp4"></source>
                            </video>
                            <div className="sobreVideo">
                                <h1>What's your next challenge?</h1>
                                <Link to="/courselist" ><button>Choose your ccourse</button></Link>
                            </div>
                        </div>
                    </>
                    : <div className="contenedorDatosCursoDashBoard">
                        {studentCourses.map(curso => <CourseCard key={curso._id} curso={curso} />)}
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        userLogged: state.user.userLogged,
    }
}
const mapDispatchToProps = {
    getCoursesByIdStudent: coursesActions.getCoursesByIdStudent
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)