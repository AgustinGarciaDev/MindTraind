import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
const Class = (props) => {
    const { lessonName, videoLink } = props.clase
    const [modalShow, setModalShow] = useState(false);


    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header >
                    <div className="contenedorBtnClose"> <i onClick={props.onHide} className="fas fa-times"></i></div>
                </Modal.Header>
                <Modal.Body>
                    <div className="contenedorFrame">
                        <iframe width="560" height="315" src={videoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Link to={`/foro/${props._id}`}>
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
                    <h1 className="titleClass">{lessonName}</h1>
                </div>
                <div>
                    <button className="btnClass " onClick={() => setModalShow(true)} ><i className="fas fa-play"></i> View Class</button>
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