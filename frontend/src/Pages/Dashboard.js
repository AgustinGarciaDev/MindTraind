import React from 'react';
import NavBarDashBoard from '../components/NavBarDashBoard'
import CourseCard from '../components/CourseCard'
const Dashboard = () => {

    const cursos = [
        { nombreCurso: "zumba", foto: "http://baravdg.com/wp-content/uploads/2021/05/d8.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" },
        { nombreCurso: "zumba", foto: "http://baravdg.com/wp-content/uploads/2021/05/d8.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" },
        { nombreCurso: "zumba", foto: "http://baravdg.com/wp-content/uploads/2021/05/d8.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" }

    ]

    return (
        <>
            <NavBarDashBoard />
            <div>
                {cursos.map(curso => <CourseCard curso={curso} />)}
            </div>
        </>
    )
}

export default Dashboard