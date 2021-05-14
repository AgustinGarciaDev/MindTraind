import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const CardJob = (props) => {

    const { title, modalidad, nameOffered, email, infoJobs, img } = props.job
    const [modalShow, setModalShow] = useState(false);

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header >
                    <div className="contenedorBtnClose"> <i onClick={props.onHide} className="fas fa-times"></i></div>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div>
                            <h2>About the company:</h2>
                            <h2>{title}</h2>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>holu</h1>
                </Modal.Body >

            </Modal >
        );
    }




    return (
        <div className="contenedorCardJob">
            <div className="fotoCardJob" style={{ backgroundImage: `url("${img}")` }}></div>
            <div>
                <h3 className="titleJob">{title}</h3>
                <h3 className="titleBussines">{nameOffered}</h3>
                <h3>{modalidad}</h3>
            </div>
            <div className="contenedorBtn">
                <button onClick={() => setModalShow(true)} className="btnDashBoard">View More</button>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default CardJob