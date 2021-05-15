import { useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import EditJob from './EditJob';

const Job = (props) => {
    const [edit, setEdit] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    const cancel = () => {
        setEdit(!edit)
    }

    return (
        <>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header>
                    <h3 className="h3Form">Edit Job</h3>
                    <div className="contenedorBtnClose"> <i onClick={handleClose} className="fas fa-times"></i></div>
                </Modal.Header>
                <Modal.Body>
                <EditJob job={props.job} setEdit={setEdit} cancel={cancel} handleClose={handleClose} />

                </Modal.Body>
            </Modal>
            <div className="courseCardContainer"  style={{ backgroundImage: `url('${props.job.urlImage}')` }} >
                <Button variant="primary" onClick={handleShow}>Edit</Button>
                <h4>{props.job.jobTittle}</h4>
            </div>
        </>
    )
}

export default Job