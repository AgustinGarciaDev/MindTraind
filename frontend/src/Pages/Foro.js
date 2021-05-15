import NavBarDashBoard from '../components/NavBarDashBoard'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Post from '../components/Post'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showToast } from '../helpers/myToast'
import coursesActions from "../redux/actions/coursesActtions"
import { connect } from "react-redux"

const Foro = (props) => {

    const idCourse = props.match.params.id
    const [commentsCourse, setCommentsCourse] = useState([]);
    const { courses, getCourseById } = props
    const { firstName, lastName, profilePicture, token } = props.userLogged
    const [modalShow, setModalShow] = useState(false);
    const [objConsult, setobjConsult] = useState({
        title: "",
        text: "",
        idCourse: idCourse,
        token: token,
        action: ""
    })

    async function fetchAPI(idCourse) {
        try {
            const course = await getCourseById(idCourse)
            setCommentsCourse(course.comments)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {

        if (courses.length !== 0) {
            let course = courses.find(aCourse => aCourse._id === idCourse)
            setCommentsCourse(course.comments)
        }
        else {
            fetchAPI(idCourse)
        }
    }, [])



    const inputData = (e) => {
        const campo = e.target.name
        const valor = e.target.value
        setobjConsult({
            ...objConsult,
            [campo]: valor
        })
    }

    const sendComent = async () => {
        console.log(objConsult)
        if (objConsult.title === "" || objConsult.comment === "") {
            showToast('error', "You cant add text")
        } else {
            const respuesta = await props.sendPost({ ...objConsult, action: "add", token: token })
            console.log(respuesta)
            setCommentsCourse(respuesta.comments)
        }
    }

    const editPost = async (idComment, title, text) => {
        const respuesta = await props.editPost({ ...objConsult, action: "update", idComment: idComment, title: title, text: text })
        setCommentsCourse(respuesta.comments)
    }

    const deletePost = async (e) => {

        const respuesta = await props.deletePost({ ...objConsult, action: "delete", idComment: e.idComment, token: token })
        showToast('success', "Delete Post")
        setCommentsCourse(respuesta.comments)

    }

    return (
        <>
            <NavBarDashBoard />
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
                    <div className="barraBuscadora">
                        <input className="inputSearch" placeholder="Search Post" type="text" />
                        <div className="contenedorIconoSearch">
                            <i class="fas fa-search"></i>
                        </div>
                    </div>
                    <div className="contenedorBtnTextArea">

                        <div onClick={() => { setModalShow(!modalShow) }} className="contenedorBienvenidaUsuario">
                            <img className="logoDashBoard" src={profilePicture} alt="" />
                            <h4 className="tituloForm"> Hi {firstName} {lastName}, doubts? Contact your tutor</h4>
                        </div>
                        <div>
                        </div>
                        {!modalShow &&
                            <div className="postYtitulo">
                                <div>
                                    <h2 className="titleInternalForm">titulo</h2>
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
                        {commentsCourse.map(post => <Post editPost={editPost} deletePost={deletePost} idCourse={idCourse} post={post} />)}
                    </div>

                </div>
            </main>


        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.user.userLogged,
        courses: state.courses.courses
    }
}

const mapDispatchToProps = {

    sendPost: coursesActions.sendPost,
    getCourseById: coursesActions.getCourseById,
    editPost: coursesActions.editPost,
    deletePost: coursesActions.deletePost,

}

export default connect(mapStateToProps, mapDispatchToProps)(Foro)
