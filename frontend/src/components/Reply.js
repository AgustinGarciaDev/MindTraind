import { OverlayTrigger } from 'react-bootstrap'
import { Popover } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import coursesActions from "../redux/actions/coursesActtions"


const Reply = (props) => {

    const { replyComment, modifyReply, idComment, idCourse, userLogged } = props
    const { textReply, userReply, _id } = replyComment;
    const [show, setShow] = useState(false);
    const [btnEdit, setBtnEdit] = useState(false)
    const [editInput, setEditInput] = useState(false);
    const [comentario, setComentario] = useState({
        mensaje: "",
    })

    const datosInput = (e) => {
        setComentario({
            mensaje: e.target.value
        })
    }

    const changeInput = () => {
        setComentario({
            ...comentario,
            mensaje: textReply
        })
        setEditInput(!editInput)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const requestModifyReply = (action, e) => {
        if (action === "update") {
            modifyReply({ action, textReply: comentario.mensaje, idCourse, idCommentReply: _id, token: userLogged.token, idComment })
            setEditInput(!editInput)

        }

        else {
            modifyReply({ action, idCourse, idCommentReply: _id, token: userLogged.token, idComment })
        }
    }


    useEffect(() => {
        if (props.userLogged) {
            if (userReply.email === props.userLogged.email) {
                setBtnEdit(!btnEdit)
            }
        }
    }, [props.userLogged])

    const popover = (
        <Popover delay={{ show: 250, hide: 400 }}>
            <Popover.Content>
                <button className="btnOpcionED" onClick={handleShow}><i class="fas fa-trash-alt"></i> Delete</button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => requestModifyReply("delete")}>
                            Delete
                 </Button>
                    </Modal.Footer>
                </Modal>
                <button onClick={changeInput} className="btnOpcionED"><i class="fas fa-edit"></i>Edit</button>
            </Popover.Content>
        </Popover>
    )

    return (
        <>
            <div className="contenedorEditorYcomentario">
                <div className="contenedorReply">
                    {<div className="fotoProfesor" style={{ backgroundImage: `url("${userReply.profilePicture}")` }}></div>}
                    <div className="contenedorDatosUserReply">
                        <h5>{userReply.firstName} {userReply.lastName}</h5>
                        {!editInput
                            ? <div><p>{textReply}</p></div>
                            : <div className="contenedorInputEdit">
                                <input
                                    className="inputEdit"
                                    onChange={(e) => datosInput(e)}
                                    name="comentario" type="text"
                                    value={comentario.mensaje}
                                />
                                <button className="btnSendEdit" onClick={() => requestModifyReply("update")}>
                                    <i class="fas fa-paper-plane"></i>

                                </button>

                            </div>
                        }

                    </div>
                </div>
                {btnEdit &&
                    <OverlayTrigger rootClose={true} trigger="click" placement="right" overlay={popover}>
                        <Button className="btnOpciones" ><i className="fas fa-ellipsis-h"></i></Button>
                    </OverlayTrigger>

                }
            </div>
        </>
    )
}

const mapDispatchToProps = {
    modifyReply: coursesActions.modifyReply
}

const mapStateToProps = (state) => {
    return {
        userLogged: state.user.userLogged
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reply)