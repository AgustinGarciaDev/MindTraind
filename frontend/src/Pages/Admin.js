import { useEffect, useState } from "react"
import Course from '../components/Course'
import Spinner from 'react-bootstrap/Spinner'
import { connect } from "react-redux"
import coursesActions from "../redux/actions/coursesActtions"

const Admin = (props) => {
    const [loader, setLoader] = useState(true)

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
        <>
            <div className="adminContainer">
                <h2>Courses</h2>
                <p>aca podria haber un filtro para facilitar la busqueda</p>
                <div className="courseContainer">
                    {
                        loader
                            ?
                            <Spinner animation="border" role="status" />
                            :
                            props.coursesList.map(course => <Course key={course._id} course={course} />)
                    }
                </div>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)