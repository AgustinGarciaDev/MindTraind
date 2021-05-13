import { useState } from "react"

const Post = (props) => {

    const [commentReply, setCommentReply] = useState(false)

    console.log(props)
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
                <div className="contenedorInputComment">
                    <input type="text" />
                    <div className="contenedorIconoSearch">
                        <i class="fas fa-paper-plane"></i>
                    </div>

                </div>
            }
        </div>
    )
}

export default Post