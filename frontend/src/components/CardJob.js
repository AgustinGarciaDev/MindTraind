import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const CardJob = (props) => {

    const { jobtittle, modality, nameOfferent, email, description, urlImage , typeJob } = props.job
    const [modalShow, setModalShow] = useState(false);

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header >
                    <div className="contenedorBtnClose"> <i onClick={props.onHide} className="fas fa-times"></i></div>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div>
                            <h2>About the company:</h2>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>{jobtittle}</h2>
                    <p>{description}</p>
                    <p>Type job: {typeJob}</p>
                    <p>Contact: {email}</p>
                </Modal.Body >

            </Modal >
        );
    }




    return (
        <div className="contenedorCardJob">
            <div className="fotoCardJob" style={{ backgroundImage: `url("${urlImage}")` }}></div>
            <div>
                <h3 className="titleJob">{jobtittle}</h3>
                <h3 className="titleBussines">{nameOfferent}</h3>
                <p className="titleBussines">({modality})</p>
              
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