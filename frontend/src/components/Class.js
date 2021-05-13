import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
const Class = (props) => {
    const { name, videoclase } = props.clase
    const [modalShow, setModalShow] = useState(false);


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
                    <div className="contenedorFrame">
                        <iframe width="560" height="315" src={videoclase} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Link to="/foro">
                        <button onClick={() => setModalShow(true)} className="btnInscripcion">Foro Consultas</button>
                    </Link>
                </Modal.Footer>
            </Modal >
        );
    }


    return (
        <>
            <div className="contenedorClase">
                <div>
                    <h1 className="titleClass">{name}</h1>
                </div>
                <div>
                    <button className="btnClass" onClick={() => setModalShow(true)} ><i class="fas fa-play"></i> View Class</button>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Class