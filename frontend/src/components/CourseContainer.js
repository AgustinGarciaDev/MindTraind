import { connect } from "react-redux"
import Course from '../components/Course'
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from "react"
import coursesActions from "../redux/actions/coursesActtions"

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
        <div className="courseBigContainer">
            <h3 className="h3Form">Courses</h3>
            <div className="courseContainer">
                {
                    loader
                        ?
                        <Spinner animation="border" role="status" />
                        :
                        props.coursesList.map(course => <Course key={course._id} course={course} />)
                }
            </div>
            <button className="formButtonsNew" onClick={() => props.setShow()}>Go back</button>
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