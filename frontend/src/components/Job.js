import { useState } from 'react'
import { Modal } from "react-bootstrap";
import EditJob from './EditJob';

const Job = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    return (
        <>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header>
                    <h3 className="h3Form">Edit Job</h3>
                    <div className="contenedorBtnClose"> <i onClick={handleClose} className="fas fa-times"></i></div>
                </Modal.Header>
                <Modal.Body>
                <EditJob job={props.job} handleClose={handleClose} />

                </Modal.Body>
            </Modal>
            <div className="courseCardContainer" onClick={handleShow} style={{ backgroundImage: `url('${props.job.urlImage}')` }} >
                <h4>{props.job.jobTittle}</h4>
            </div>
        </>
    )
}

export default Job