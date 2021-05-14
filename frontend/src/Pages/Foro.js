import NavBarDashBoard from '../components/NavBarDashBoard'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Post from '../components/Post'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showToast } from '../helpers/myToast'
import coursesActions from "../redux/actions/coursesActtions"
import { connect } from "react-redux"

const Foro = (props) => {

    const { firstName, lastName, profilePicture, email } = props.userLogged
    const [modalShow, setModalShow] = useState(false);
    const [objConsult, setobjConsult] = useState({
        title: "",
        comment: "",
    })

    const inputData = (e) => {
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
            alert("E")
        }
    }


    const post = [
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo", titulo: "Consulta 1", foto: "http://baravdg.com/wp-content/uploads/2021/04/46.jpg" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo", titulo: "Consulta 1", foto: "http://baravdg.com/wp-content/uploads/2021/04/46.jpg" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo", titulo: "Consulta 1", foto: "http://baravdg.com/wp-content/uploads/2021/04/46.jpg" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo", titulo: "Consulta 1", foto: "http://baravdg.com/wp-content/uploads/2021/04/46.jpg" },
    ]




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
                                    <textarea onChange={inputData} value={objConsult.comment} name="comment" className="textAreaConsulta" cols="30" rows="10"></textarea>
                                </div>
                                <div className="contenedorBtn">
                                    <button onClick={sendComent} className="btnDashBoard btnForm">Send</button>
                                </div>

                            </div>
                        }
                    </div>
                    <div className="contenedorComentarios">
                        {post.map(post => <Post post={post} />)}
                    </div>

                </div>
                <div className="contenedorBtn">
                    <button className="btnDashBoard spaceBtnQuery">
                        Write query
                    </button>
                </div>
            </main>


        </>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.user.userLogged
    }
}

const mapDispatchToProps = {

    loadComment: coursesActions.loadComment,

}

export default connect(mapStateToProps, mapDispatchToProps)(Foro)
