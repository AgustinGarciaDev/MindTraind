import { useEffect, useState } from "react"
import axios from 'axios'
import Course from '../components/Course'
import Spinner from 'react-bootstrap/Spinner'

const Admin = () => {
    const [courses, setCourses] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:4000/api/courses')
            .then(response => {
                if (response.data.success) {
                    setCourses(response.data.response)
                    setLoader(false)
                }
            })
    }, [])

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
                            courses.map(course => <Course key={course._id} course={course} />)
                    }
                </div>
            </div>
        </>
    )
}

export default Admin