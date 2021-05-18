import { connect } from "react-redux"
import Course from '../components/Course'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from "react"
import coursesActions from "../redux/actions/coursesActtions"
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const CourseContainer = (props) => {
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (props.coursesList.length === 0) {
            props.getCourses()
        } else {
            setLoader(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.coursesList])

    return (
        <div className="contenedorMenu">
            <div className="contenedorWeb">
                <Header />
                <div className="courseBigContainer" style={{ backgroundImage: `url('https://baravdg.com/wp-content/uploads/2021/05/rayas-red-izq-1.png')` }}>
                    <h3 className="h3tittle">Courses</h3>
                    <div className="courseContainer">
                        {
                            loader
                                ?
                                <Spinner animation="border" role="status" />
                                :
                                props.coursesList.map(course => <Course key={course._id} course={course} />)
                        }
                    </div>
                    <Link className="formButtonsNewWhite" to="/admin" type="button" >Go back</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)