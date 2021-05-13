import { useState } from "react"
import Reply from '../components/Reply'

const Post = (props) => {

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

    console.log(comentario)

    const { apellido, name, titulo, comment, foto } = props.post
    return (
        <div className="contenedorPost">
            <h2 className="tituloPost">{titulo}</h2>
            <div className="contedorDatosUsuario">
                <img className="comentarioFotoUser" src={foto} alt="" />
                <div className="contenedorNameUser">
                    <h3>{name} {apellido}</h3>
                </div>
            </div>
            <div className="contenedorComentario">
                <p>{comment}</p>
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

export default Post