import Header from '../components/Header'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Post from '../components/Post'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showToast } from '../helpers/myToast'
import coursesActions from "../redux/actions/coursesActtions"
import { connect } from "react-redux"

const Foro = (props) => {
    const idCourse = props.match.params.id
    const { getCourseById, currentCourse } = props
    const { firstName, lastName, profilePicture, token } = props.userLogged
    const [modalShow, setModalShow] = useState(false);
    const [objConsult, setobjConsult] = useState({
        title: "",
        text: "",
        idCourse: idCourse,
        token: token,
        action: ""
    })

    useEffect(() => {
        if (!currentCourse) {
            getCourseById(idCourse)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const inputData = (e = null) => {
        const campo = e.target.name
        const valor = e.target.value
        setobjConsult({
            ...objConsult,
            [campo]: valor
        })
    }

    const sendComent = () => {
        if (objConsult.title === "" || objConsult.comment === "") {
            showToast('error', "You cant add text")
        } else {
            props.sendPost({ ...objConsult, action: "add", token: token })
            showToast('success', "Query sent successfully")
            setModalShow(!modalShow)
        }
    }

    const editPost = (idComment, title, text) => {
        props.editPost({ ...objConsult, action: "update", idComment: idComment, title: title, text: text })

    }

    const deletePost = (e) => {

        props.deletePost({ ...objConsult, action: "delete", idComment: e.idComment, token: token })
        showToast('success', "Delete Post")
    }


    if (!props.currentCourse || !props.userLogged) {
        return null
    }


    return (
        <div className="contenedorWeb">
            <Header />
            <main className="contenedorPosteos">
                <div className="contenedorBannerForo">
                    <div className="contenedorBtnyTextBanner">
                        <h4 className="titleHelp"> Wanna be part of our community? <br />
                    Join our discord channel
                    </h4>
                        <button className="btnDashBoard spaceBtnForo">
                            <Link to="/chat">Go!</Link>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="contenedorBtnTextArea">

                        <div onClick={() => { setModalShow(!modalShow) }} className="contenedorBienvenidaUsuario">
                            {<div className="fotoUsuarioForo" style={{ backgroundImage: `url("${profilePicture}")` }}></div>}
                            <h4 className="tituloForm"> Hi {firstName} {lastName}, doubts? Contact your tutor</h4>
                        </div>
                        <div>
                        </div>
                        {!modalShow &&
                            <div className="postYtitulo">
                                <div>
                                    <h2 className="titleInternalForm">Title</h2>
                                    <input onChange={inputData} value={objConsult.title} name="title" className="inputPost" type="text" />
                                </div>
                                <div>
                                    <h2 className="titleInternalForm" >Content</h2>
                                    <textarea onChange={inputData} value={objConsult.text} name="text" className="textAreaConsulta" cols="30" rows="10"></textarea>
                                </div>
                                <div className="contenedorBtn">
                                    <button onClick={sendComent} className="btnDashBoard btnForm">Send</button>
                                </div>

                            </div>
                        }
                    </div>
                    <div className="contenedorComentarios">
                        {props.currentCourse.comments.map(post => <Post key={post._id} editPost={editPost} deletePost={deletePost} idCourse={idCourse} post={post} />)}
                    </div>

                </div>
            </main>
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

    sendPost: coursesActions.sendPost,
    getCourseById: coursesActions.getCourseById,
    editPost: coursesActions.editPost,
    deletePost: coursesActions.deletePost,

}

export default connect(mapStateToProps, mapDispatchToProps)(Foro)
