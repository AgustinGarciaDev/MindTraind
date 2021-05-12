import { useState } from "react";
import { Nav } from "react-bootstrap";

const SideNavSuscribe = (props) => {

    const [close, setClose] = useState(false)

    const closeModal = () => {
        setClose(true)
    }

    return (
        <div className="contenedorAsideNav">
            <button onClick={closeModal} >X</button>
            <div>
                <h1>Inscripcion al curso</h1>
                {<h2>{props.infoCourse.nameCourse}</h2>}
                <i class="fab fa-facebook"></i>
            </div>
        </div>
    )
}

export default SideNavSuscribe