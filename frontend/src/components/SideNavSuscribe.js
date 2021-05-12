import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MydModalWithGrid from "react-bootstrap"

const SideNavSuscribe = (props) => {
    const [modalShow, setModalShow] = useState(false);

    console.log(props)
    if (props.infoCourse === null) {

        return false
    }
    const { nameCourse, duration, difficulty, programDescription } = props.infoCourse

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>hola</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }




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
            <button onClick={() => setModalShow(true)} className="btnInscripcion">Inscribirme</button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default SideNavSuscribe