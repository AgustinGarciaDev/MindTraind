import React from 'react';
import NavBarDashBoard from '../components/NavBarDashBoard'
import CourseCard from '../components/CourseCard'
const Dashboard = () => {

    const cursos = [
        { nameCourse: "Zumba", pictureRefence: "http://baravdg.com/wp-content/uploads/2021/05/pexels-andrea-piacquadio-3775566-1-scaled.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" },
        { nameCourse: "Zumba", pictureRefence: "http://baravdg.com/wp-content/uploads/2021/05/pexels-andrea-piacquadio-3775566-1-scaled.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" },
        { nameCourse: "Zumba", pictureRefence: "http://baravdg.com/wp-content/uploads/2021/05/pexels-andrea-piacquadio-3775566-1-scaled.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" }
    ]

    return (
        <>
            <NavBarDashBoard />
            <h1 className="tituloDasboard">My courses</h1>
            <div className="ContenedorDeLosCursos">
                {cursos.map(curso => <CourseCard curso={curso} />)}
            </div>
        </>
    )
}

export default Dashboard