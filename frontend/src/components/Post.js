import { useState } from "react"
import Reply from '../components/Reply'
import coursesActions from "../redux/actions/coursesActtions"
import { connect } from "react-redux"
import { toast } from 'react-toastify';

const Post = (props) => {

    const { title, text, user: { profilePicture, lastName, firstName } } = props.post
    console.log(props)
    const reply = [
        { comentario: "hola" },
        { comentario: "hola" }
    ]


    const [commentReply, setCommentReply] = useState(false)
    const [comentario, setComentario] = useState({
        mensaje: "",
    })


    const datosInput = (e) => {
        setComentario({
            mensaje: e.target.value
        })
    }

    return (
        <div className="contenedorPost">
            <h2 className="tituloPost">{title}</h2>
            <div className="contedorDatosUsuario">
                <img className="comentarioFotoUser" src={profilePicture} alt="" />
                <div className="contenedorNameUser">
                    <h3>{firstName} {lastName}</h3>
                </div>
            </div>
            <div className="contenedorComentario">
                <p>{text}</p>
            </div>
            <div onClick={() => { setCommentReply(!commentReply) }} className="contenedorComentario replyBtn">
                <i class="fas fa-reply"></i>
                <p>Reply</p>
            </div>
            { commentReply &&
                <>
                    <div>{reply.map(reply => <Reply reply={reply} />)}</div>
                    <div className="contenedorInputComment">
                        <input onChange={datosInput} name="comentario" className="inputComment" type="text" />
                        <div className="contenedorIconoSearch">
                            <i class="fas fa-paper-plane"></i>
                        </div>

                    </div>
                </>
            }
        </div>
    )
}



const mapDispatchToProps = {

    editComment: coursesActions.editComment,
    deleteComment: coursesActions.deleteComment,
}


export default connect(null, mapDispatchToProps)(Post)