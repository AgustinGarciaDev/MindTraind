import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

const SideNavSuscribe = (props) => {

    if (props.infoCourse === null) {

        return false
    }
    const { nameCourse } = props.infoCourse
    return (
        <div className="contenedorAsideNav">
            <button onClick={() => props.closeModal()} >X</button>
            <div>
                <h1>Inscripcion al curso</h1>
                <h3>{nameCourse}</h3>
                <i class="fab fa-facebook"></i>
            </div>
        </div>
    )
}

export default SideNavSuscribe