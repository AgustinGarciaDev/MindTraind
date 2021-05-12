import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

const SideNavSuscribe = (props) => {

    console.log(props)
    if (props.infoCourse === null) {

        return false
    }
    const { nameCourse, duration, difficulty, programDescription } = props.infoCourse
    return (
        <div className="contenedorAsideNav">
            <div className="contenedorBtnClose"> <i onClick={() => props.closeModal()} className="fas fa-times"></i></div>
            <div>
                <h1 className="titleContenedorAside">Start your professional career</h1>
                <h3 className="nameTitleAside">{nameCourse}</h3>
                <div className="lineaTitle"></div>
                <div className="contenedorDatosCourseAside">
                    <div className="textoCourseAside">
                        <h2>Duration</h2>
                        <p>{duration}semanas</p>
                    </div>
                    <div className="textoCourseAside">
                        <h2>Difficulty</h2>
                        <p>{difficulty}semanas</p>
                    </div>
                </div>
                <div>
                    <h2>About course</h2>
                    <p>{programDescription}</p>
                </div>
            </div>
            <button className="btnInscripcion">Inscribirme</button>
        </div>
    )
}

export default SideNavSuscribe