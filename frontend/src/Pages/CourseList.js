import SuscribeCardCourse from '../components/SuscribeCardCourse'
import NavBarDashBoard from '../components/NavBarDashBoard'
import SideNavSuscribe from '../components/SideNavSuscribe'
import coursesActions from "../redux/actions/coursesActtions"
import AsideNav from '../components/AsideNav'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [props.coursesList])


    return (


        <div className="contenedorMenu">
            <AsideNav />
            <div className="contenedorWeb">
                <NavBarDashBoard />
                <div className="fotoPortadaCourse">
                    <h1 className="cursoModalTitle titlePrincipal" >Boost your career with our courses</h1>
                </div>
                <div className="contenedorCourseAndSideBar">
                    <div className="contenedorInscripcionCursos courseList">
                        {
                            loader
                                ?
                                <Spinner animation="border" role="status" />
                                :
                                props.coursesList.map(course => <SuscribeCardCourse close={close} courseSubscription={courseSubscription} course={course} />)
                        }
                    </div>
                    {!close && <SideNavSuscribe closeModal={closeModal} infoCourse={infoCourse} />}
                </div>

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
