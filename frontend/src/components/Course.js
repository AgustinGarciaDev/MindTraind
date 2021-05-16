import { useState } from 'react'
import EditCourse from '../components/EditCourse'
import { Modal, Button } from "react-bootstrap";


const Course = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    return (
        <>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header>
                    <h3 className="h3Form">Edit course</h3>
                    <div className="contenedorBtnClose"> <i onClick={handleClose} className="fas fa-times"></i></div>
                </Modal.Header>
                <Modal.Body>
                    <EditCourse course={props.course} handleClose={handleClose} />
                </Modal.Body>
            </Modal>
            <div className="courseCardContainer" onClick={handleShow} style={{ backgroundImage: `url('${props.course.pictureRefence}')` }}>
                <h4>{props.course.nameCourse}</h4>
            </div>
        </>
    )
}

export default Course