import { useState, useEffect } from "react"
import Reply from '../components/Reply'
import coursesActions from "../redux/actions/coursesActtions"
import { connect } from "react-redux"
import { showToast, showTostError500 } from '../helpers/myToast'
import { OverlayTrigger } from 'react-bootstrap'
import { Popover } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Post = (props) => {
    useEffect(() => {
        if (!props.currentCourse) {
            fetchAPI();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchAPI = async () => {
        try {
            props.getCourseById(props.idCourse);

        } catch (err) {
            console.log(err);
            showTostError500();
        }
    }
    const [show, setShow] = useState(false);
    const [editInput, setEditInput] = useState(false);
    const [editInputTitle, setEditInputTitle] = useState(false)
    const { title, _id, text, user: { profilePicture, lastName, firstName, email } } = props.post
    const [commentReply, setCommentReply] = useState(false)
    const [btnEdit, setBtnEdit] = useState(false)
    const { token } = props.userLogged
    const [objConsult, setobjConsult] = useState({
        textReply: "",
        idCourse: props.currentCourse._id,
        token: token,
        action: "add",
        userEmailReply: props.email,
        idComment: _id
    })


    const [editPost, setEditPost] = useState({
        text: text,
        title: title
    })


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const inputData = (e) => {
        const campo = e.target.name
        const valor = e.target.value
        setEditPost({
            ...editPost,
            [campo]: valor
        })
    }

    const inputDataReply = (e) => {
        const campo = e.target.name
        const valor = e.target.value
        setobjConsult({
            ...objConsult,
            [campo]: valor
        })
    }

    const changeInput = () => {
        setEditInput(!editInput)
    }

    const sendReplyComment = () => {

        if (objConsult.textReply === "") {
            showToast('error', "You cant add text")
        } else {
            props.sendReply(objConsult)

        }
    }

    const editCommentChange = (e) => {

        props.editPost(_id, editPost.title, editPost.text)
        if (e.target.dataset.input === "btnText") {
            setEditInput(!editInput)
        } else {
            setEditInputTitle(!editInputTitle)
        }

    }


    useEffect(() => {
        if (props.userLogged) {
            if (email === props.userLogged.email) {
                setBtnEdit(!btnEdit)
            }
        }
    }, [props.userLogged])

    const popover = (
        <Popover delay={{ show: 250, hide: 400 }}>
            <Popover.Content>
                <button className="btnOpcionED" onClick={handleShow}><i className="fas fa-trash-alt"></i> Delete</button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={() => props.deletePost({ idComment: props.post._id })}
                        >Delete</Button>
                    </Modal.Footer>
                </Modal>
                <button onClick={changeInput} className="btnOpcionED"><i className="fas fa-edit"></i>Edit text</button>
                <button onClick={() => { setEditInputTitle(!editInputTitle) }} className="btnOpcionED"><i className="fas fa-heading"></i>Edit title</button>
            </Popover.Content>
        </Popover>
    )

    return (
        <div className="contenedorPost">

            {!editInputTitle
                ? <div className="contenedorEditInputs">
                    <h2 className="tituloPost">{title}</h2>
                    {btnEdit &&
                        <OverlayTrigger rootClose={true} trigger="click" placement="right" overlay={popover}>
                            <Button className="btnModificarInputs" ><i className="fas fa-ellipsis-h"></i></Button>
                        </OverlayTrigger>
                    }
                </div>
                : <div className="contenedorEditInputs" >
                    <input
                        className="inputTitle"
                        onChange={inputData}
                        name="title" type="text"
                        value={editPost.title}
                    />
                    <button id="btnTitle" onClick={editCommentChange} >
                        <i className="fas fa-edit"></i>
                    </button>

                    <OverlayTrigger rootClose={true} trigger="click" placement="right" overlay={popover}>
                        <Button className="btnOpciones" ><i className="fas fa-ellipsis-h"></i></Button>
                    </OverlayTrigger>
                </div>

            }
            <div className="contedorDatosUsuario">
                <img className="comentarioFotoUser" src={profilePicture} alt="" />
                <div className="contenedorNameUser">
                    <h3>{firstName} {lastName}</h3>
                </div>
            </div>
            <div className="contenedorComentario">
                {!editInput
                    ? <p>{text}</p>
                    : <div className="contenedorTextAreaEdit">
                        <textarea
                            className="textAreaEdit"
                            onChange={inputData}
                            name="text"
                            type="text"
                            value={editPost.text}
                        ></textarea>
                        <button className="btnText" data-input="btnText" onClick={editCommentChange} >
                            <i data-input="btnText" class="fas fa-edit"></i>
                        </button>
                    </div>

                }
            </div>
            <div onClick={() => { setCommentReply(!commentReply) }} className="contenedorComentario replyBtn">
                <i className="fas fa-reply"></i>
                <p>Reply</p>
            </div>

            <>
                {props.post.reply.map(aReply => <Reply key={aReply._id} replyComment={aReply} idComment={props.post._id} idCourse={props.currentCourse._id} />)}

                <div className="contenedorInputComment">
                    <input
                        value={objConsult.textReply}
                        onChange={inputDataReply}
                        name="textReply"
                        className="inputComment"
                        type="text" />
                    <div onClick={sendReplyComment} className="contenedorIconoSearch">
                        <i className="fas fa-paper-plane"></i>
                    </div>

                </div>
            </>


        </div>
    )
}


const mapStateToProps = state => {
    return {
        userLogged: state.user.userLogged,
        currentCourse: state.courses.currentCourse
    }
}


const mapDispatchToProps = {
    sendReply: coursesActions.modifyReply,
    getCourseById: coursesActions.getCourseById,
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)