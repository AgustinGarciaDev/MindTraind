import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const SideNavSuscribe = (props) => {
    const [modalShow, setModalShow] = useState(false);

    console.log(props)
    if (props.infoCourse === null) {

        return false
    }
    const { nameCourse, duration, difficulty, programDescription, pictureRefence } = props.infoCourse

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header >
                    <div className="contenedorBtnClose"> <i onClick={props.onHide} className="fas fa-times"></i></div>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3 className="cursoModalTitle" >Professional career</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="contenedorInformacionModal">
                        <div className="cursoModal" style={{ backgroundImage: `url("${pictureRefence}")` }}></div>
                        <div>
                            <div className="modalTextContent">
                                <h3 className="cursoModalTitle" >Name:</h3>
                                <p className="cursoModalSubtitle">{nameCourse}</p>
                            </div>

                            <div className="modalTextContent">
                                <h3 className="cursoModalTitle" >Duration:</h3>
                                <p className="cursoModalSubtitle">{duration}<span>weeks</span></p>
                            </div>

                            <div className="modalTextContent">
                                <h3 className="cursoModalTitle" >Difficulty:</h3>
                                <p className="cursoModalSubtitle">{difficulty}<span>intensity level</span></p>
                            </div>

                        </div>
                    </div>
                </Modal.Body >
                <Modal.Footer>

                    <button onClick={() => setModalShow(true)} className="btnInscripcion">Inscribirme</button>
                </Modal.Footer>
            </Modal >
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