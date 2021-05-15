import React, { useEffect, useState } from 'react';
import NavBarDashBoard from '../components/NavBarDashBoard'
import CourseCard from '../components/CourseCard'

import { connect } from 'react-redux'
import coursesActions from '../redux/actions/coursesActtions';
import { showToast, showTostError500 } from '../helpers/myToast'

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
        <>
            <NavBarDashBoard />
            <h1 className="tituloDasboard">My courses</h1>
            <div className="ContenedorDeLosCursos">
                {studentCourses.map(curso => <CourseCard key={curso._id} curso={curso} />)}
            </div>
        </>
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