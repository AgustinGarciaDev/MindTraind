import SuscribeCardCourse from '../components/SuscribeCardCourse'
import NavBarDashBoard from '../components/NavBarDashBoard'
import SideNavSuscribe from '../components/SideNavSuscribe'
import { useState } from 'react'
const CourseList = () => {

    const [inscripcion, setInscripcion] = useState(false)
    const [infoCourse, setInfoCourse] = useState(null)
    const cursos = [
        { nameCourse: "Zumba", pictureRefence: "http://baravdg.com/wp-content/uploads/2021/05/pexels-andrea-piacquadio-3775566-1-scaled.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" },
        { nameCourse: "Baile", pictureRefence: "http://baravdg.com/wp-content/uploads/2021/05/pexels-andrea-piacquadio-3775566-1-scaled.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" },
        { nameCourse: "Danza", pictureRefence: "http://baravdg.com/wp-content/uploads/2021/05/pexels-andrea-piacquadio-3775566-1-scaled.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" }
    ]
    const courseSubscription = (course) => {

        setInfoCourse(course)
    }

    return (
        <div>
            <NavBarDashBoard />
            <h1>Lista cursos</h1>
            <div className="contenedorInscripcionCursos courseList">
                {cursos.map(curso => <SuscribeCardCourse courseSubscription={courseSubscription} curso={curso} />)}
                {infoCourse && <SideNavSuscribe infoCourse={infoCourse} />}
            </div>


        </div>

    )
}

export default CourseList