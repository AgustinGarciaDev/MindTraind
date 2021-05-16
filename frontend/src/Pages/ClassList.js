import NavBarDashBoard from '../components/NavBarDashBoard'
import Class from '../components/Class'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AsideNav from '../components/AsideNav'
import coursesActions from '../redux/actions/coursesActtions'
const ClassList = (props) => {


    const { courses, getCourseById } = props
    const [lessonsCourse, setLessonsCourse] = useState([]);
    const [courseData, setCourseData] = useState([])

    async function fetchAPI(idCourse) {
        try {
            const course = await getCourseById(idCourse)
            setCourseData(course)
            setLessonsCourse(course.lessons)


        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const idCourse = props.match.params.id
        if (courses.length !== 0) {
            let course = courses.find(aCourse => aCourse._id === idCourse)
            setCourseData(course)
            setLessonsCourse(course.lessons)

        }
        else {
            fetchAPI(idCourse)
        }
    }, [])

    if (courseData.length === 0) {
        return null
    }
    const { pictureRefence, lessons, nameCourse, coach: { lastName, firstName, profilePicture, email } } = courseData

    return (
        <>
            <div className="contenedorMenu">
                <AsideNav />
                <div className="contenedorWeb">
                    <NavBarDashBoard />
                    <div>
                        <div className="portadaCourse" style={{ backgroundImage: `url(${pictureRefence})` }}>
                            <div className="superposicionPortada">
                                <h2 className="textTitle">{nameCourse}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="contenedorProfesorYbtn">
                        <div className="cardProfesor">
                            <div className="titleCardTeacher"><h2>Teacher</h2></div>
                            <div className="fotoYnombreProfesor">
                                <div className="fotoProfesor" style={{ backgroundImage: `url(${profilePicture})` }}> </div>
                                <h2>{firstName} {lastName}</h2>
                            </div>
                            <div className="contenedorCorreoProfesor">
                                <i className="fas fa-envelope"></i>
                                <p>{email}</p>
                            </div>
                        </div>
                        <div className="contenedorForumConsultas"> <Link to={`/foro/${props.match.params.id}`} ><button className="btnDashBoard">Consultation forum</button></Link></div>
                    </div>
                    <div className="contenedorTitle">
                        <h2>Program Course</h2>
                    </div>
                    <div className="classContainer">
                        {lessonsCourse.map(lesson => <Class key={lesson._id} clase={lesson} />)}
                    </div>
                </div>
            </div>

        </>

    )
}
const mapStateToProps = (state) => {
    return {
        courses: state.courses.courses
    }
}
const mapDispatchToProps = {
    getCourseById: coursesActions.getCourseById,

}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList)