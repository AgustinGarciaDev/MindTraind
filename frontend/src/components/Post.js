import { useState, useEffect } from "react"
import Reply from '../components/Reply'
import coursesActions from "../redux/actions/coursesActtions"
import { connect } from "react-redux"
import { showToast } from '../helpers/myToast'
import { OverlayTrigger } from 'react-bootstrap'
import { Popover } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const Post = (props) => {
    const [show, setShow] = useState(false);
    const [editInput, setEditInput] = useState(false);
    const [editInputTitle, setEditInputTitle] = useState(false)
    const { idCourse } = props
    /* const { courses, getCourseById } = props */
    const { title, _id, text, user: { profilePicture, lastName, firstName }, reply } = props.post
    const [commentReply, setCommentReply] = useState(false)
    const { token, email } = props.userLogged
    const [replyCourse, setReplyCourse] = useState(props.post);
    const [objConsult, setobjConsult] = useState({
        textReply: "",
        idCourse: idCourse,
        token: token,
        action: "",
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
        setobjConsult({
            ...objConsult,
            [campo]: valor
        })
    }

    const changeInput = () => {

        setEditInput(!editInput)
    }

    const editCommentChange = (e) => {

        props.editPost(_id, editPost.title, editPost.text)
        if (e.target.id === "btnText") {
            setEditInput(!editInput)
        } else {
            setEditInputTitle(!editInputTitle)
        }


    }


    const sendReply = async () => {

        if (objConsult.textReply === "") {
            showToast('error', "You cant add text")
        } else {
            const respuesta = await props.sendPost({ ...objConsult, action: "add" })
            /*             console.log(respuesta.comments) */
            /*    setReplyCourse(respuesta) */
            /*      console.log(replyCourse) */
        }
    }



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
                        <Button variant="primary"
                            onClick={() => props.deletePost({ idComment: props.post._id })}
                        >Delete</Button>
                    </Modal.Footer>
                </Modal>
                <button onClick={changeInput} className="btnOpcionED"><i className="fas fa-edit"></i>Edit text</button>
                <button onClick={() => { setEditInputTitle(!editInputTitle) }} className="btnOpcionED"><i class="fas fa-heading"></i>Edit title</button>
            </Popover.Content>
        </Popover>
    )


    return (
        <div className="contenedorPost">

            {!editInputTitle
                ? <div className="contenedorEditInputs">
                    <h2 className="tituloPost">{title}</h2>
                    <OverlayTrigger rootClose={true} trigger="click" placement="right" overlay={popover}>
                        <Button className="btnModificarInputs" ><i className="fas fa-ellipsis-h"></i></Button>
                    </OverlayTrigger>
                </div>
                : <div className="contenedorEditInputs" >
                    <input
                        className="inputTitle"
                        onChange={inputData}
                        name="title" type="text"
                        value={editPost.title}
                    />
                    <button id="btnTitle" onClick={editCommentChange} >
                        <i class="fas fa-edit"></i>
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
                            name="text" type="text"
                            value={editPost.text}
                        ></textarea>
                        <button id="btnText" onClick={editCommentChange} >
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>

                }
            </div>
            <div onClick={() => { setCommentReply(!commentReply) }} className="contenedorComentario replyBtn">
                <i class="fas fa-reply"></i>
                <p>Reply</p>
            </div>
            { commentReply &&
                <>
                    <div>
                        {/*          {replyCourse.reply.map(reply => <Reply reply={reply} />)} */}
                    </div>

                    <div className="contenedorInputComment">
                        <input value={objConsult.textReply} onChange={inputData} name="textReply" className="inputComment" type="text" />
                        <div onClick={sendReply} className="contenedorIconoSearch">
                            <i className="fas fa-paper-plane"></i>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}


const mapStateToProps = state => {
    return {
        userLogged: state.user.userLogged,
        courses: state.courses.courses
    }
}


const mapDispatchToProps = {

    /*     editComment: coursesActions.editComment,
        deleteComment: coursesActions.deleteComment, */
    sendPost: coursesActions.sendPost,
    /*    getCourseById: coursesActions.getCourseById, */
}


export default connect(mapStateToProps, mapDispatchToProps)(Post)