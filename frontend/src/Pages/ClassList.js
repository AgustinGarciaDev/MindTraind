import NavBarDashBoard from '../components/NavBarDashBoard'
import Class from '../components/Class'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import coursesActions from '../redux/actions/coursesActtions'
const ClassList = (props) => {

    console.log(props.match.params)
    const { courses, getCourseById } = props
    const [lessonsCourse, setLessonsCourse] = useState([]);
    async function fetchAPI(idCourse) {
        try {
            const course = await getCourseById(idCourse)
            setLessonsCourse(course.lessons)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const idCourse = props.match.params.id
        if (courses.length !== 0) {
            let course = courses.find(aCourse => aCourse._id === idCourse)
            setLessonsCourse(course.lessons)
        }
        else {
            fetchAPI(idCourse)
        }




    }, [])


    const clases = [
        { name: "clase 1", videoclase: "https://www.youtube.com/embed/DiBmqCze5Uk" },
        { name: "clase 2", videoclase: "https://www.youtube.com/embed/DiBmqCze5Uk" },
        { name: "clase 3", videoclase: "https://www.youtube.com/embed/erzfY5eswpM" },
        { name: "clase 4", videoclase: "https://www.youtube.com/embed/erzfY5eswpM" },
    ]
    return (
        <>
            <NavBarDashBoard />
            <div>
                <Link to={`/foro/${props.match.params.id}`} ><button className="btnDashBoard">Go course!</button></Link>
            </div>
            <div>
                <h2>Program Course</h2>
            </div>
            <div className="classContainer">
                {lessonsCourse.map(lesson => <Class key={lesson._id} clase={lesson} />)}
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