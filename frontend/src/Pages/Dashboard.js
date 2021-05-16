import React, { useEffect, useState } from 'react';
import NavBarDashBoard from '../components/NavBarDashBoard'
import CourseCard from '../components/CourseCard'
import AsideNav from '../components/AsideNav'
import { connect } from 'react-redux'
import coursesActions from '../redux/actions/coursesActtions';
import { showToast, showTostError500 } from '../helpers/myToast'
import { Link } from 'react-router-dom'

const Dashboard = ({ getCoursesByIdStudent, userLogged }) => {
    const [studentCourses, setStudentCourses] = useState([])

    async function fetchAPI() {
        console.log(userLogged)
        if (userLogged) {
            try {
                let data = await getCoursesByIdStudent(userLogged.token)
                console.log(data)
                data.success ? setStudentCourses(data.response) : showToast("error", data.error)
            } catch (err) {
                console.log(err)
                showTostError500();
            }
        }
    }
    useEffect(() => {
        fetchAPI()
    }, [])


    return (
        <div className="contenedorMenu">
            <AsideNav />
            <div className="contenedorWeb">
                <NavBarDashBoard />
                {/*   <h1 className="tituloDasboard">My courses</h1> */}

                {studentCourses.length === 0
                    ? <>
                        {/* <h1>anotate en nuestro cursos</h1> */}
                        <div className="ContenedorPresentacion">
                            <video className="videoDash" autoPlay loop muted >
                                <source src="http://baravdg.com/wp-content/uploads/2021/05/pexels-produtora-midtrack-6509537-1.mp4" type="video/mp4"></source>
                            </video>
                            <div className="sobreVideo">
                                <h1>What's your next challenge?</h1>
                                <Link to="/courselist" ><button>Choose your course</button></Link>
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