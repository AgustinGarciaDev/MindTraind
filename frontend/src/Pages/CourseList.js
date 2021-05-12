import SuscribeCardCourse from '../components/SuscribeCardCourse'
import NavBarDashBoard from '../components/NavBarDashBoard'
import SideNavSuscribe from '../components/SideNavSuscribe'
import coursesActions from "../redux/actions/coursesActtions"
import { connect } from "react-redux"
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from 'react'
const CourseList = (props) => {
    const [close, setClose] = useState(false)
    const [loader, setLoader] = useState(true)
    const [infoCourse, setInfoCourse] = useState(null)

    const courseSubscription = (course) => {
        setInfoCourse(course)
        setClose(false)
    }
    const closeModal = () => {
        setClose(true)
    }

    useEffect(() => {
        if (props.coursesList.length === 0) {
            props.getCourses()
        }
        if (props.coursesList.length !== 0) {
            setLoader(false)
        }
    }, [props.coursesList])


    return (
        <div>
            <NavBarDashBoard />
            <h1>Lista cursos</h1>
            <div className="contenedorInscripcionCursos courseList">

                {
                    loader
                        ?
                        <Spinner animation="border" role="status" />
                        :
                        props.coursesList.map(course => <SuscribeCardCourse courseSubscription={courseSubscription} course={course} />)
                }

                {!close && <SideNavSuscribe closeModal={closeModal} infoCourse={infoCourse} />}
            </div>


        </div>

    )
}

const mapStateToProps = state => {
    return {
        coursesList: state.courses.courses
    }
}
const mapDispatchToProps = {
    getCourses: coursesActions.getCourses
}


export default connect(mapStateToProps, mapDispatchToProps)(CourseList)
