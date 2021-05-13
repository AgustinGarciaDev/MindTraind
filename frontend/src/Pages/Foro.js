import NavBarDashBoard from '../components/NavBarDashBoard'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Post from '../components/Post'
import { useEffect, useState } from "react";


const Foro = () => {
    const [modalShow, setModalShow] = useState(false);
    const nameUser = "Agustin"
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
                <div className="barraBuscadora">
                    <input className="inputSearch" placeholder="Search Post" type="text" />
                    <div className="contenedorIconoSearch">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
                <div className="contenedorBtnTextArea">

                    <div onClick={() => { setModalShow(!modalShow) }} className="contenedorBienvenidaUsuario">
                        <img className="logoDashBoard" src="http://baravdg.com/wp-content/uploads/2021/04/46.jpg" alt="" />
                        <h4 className="tituloForm">
                            Hi {nameUser} Queres compartir algo?
                        </h4>
                    </div>
                    <div>
                    </div>
                    {!modalShow &&
                        <div className="postYtitulo">
                            <div>
                                <h2 className="titleInternalForm">titulo</h2>
                                <input className="inputPost" type="text" />
                            </div>
                            <div>
                                <h2 className="titleInternalForm" >Content</h2>
                                <textarea className="textAreaConsulta" name="" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="contenedorBtn">
                                <button className="btnDashBoard btnForm">Send</button>
                            </div>

                        </div>
                    }
                </div>
                <div className="contenedorComentarios">
                    {post.map(post => <Post post={post} />)}
                </div>

            </main>


        </>
    )
}

export default Foro