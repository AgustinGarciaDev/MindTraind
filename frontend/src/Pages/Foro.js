import NavBarDashBoard from '../components/NavBarDashBoard'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Post from '../components/Post'
import { convertFromRaw, convertToRaw } from 'draft-js';
import { useEffect, useState } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

/* import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
 */
const Foro = () => {
    const [modalShow, setModalShow] = useState(false);
    const nameUser = "Agustin"
    const post = [
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo" },
    ]


    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState) => {

        setEditorState(editorState)
    }

    const info = convertToRaw(editorState.getCurrentContent())
    console.log(info)
    const rawState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    console.log(rawState)

    /*     const conver = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    
        console.log(conver) */
    return (
        <>
            <NavBarDashBoard />
            <main className="contenedorPosteos">
                <div className="contenedorBtnTextArea">

                    <div onClick={() => { setModalShow(!modalShow) }} className="contenedorBienvenidaUsuario">
                        <img className="logoDashBoard" src="http://baravdg.com/wp-content/uploads/2021/04/46.jpg" alt="" />
                        <h4>
                            Hi {nameUser} Queres compartir algo?
                        </h4>
                    </div>
                    {!modalShow &&
                        <div className="postYtitulo">
                            <div>
                                <h2>titulo</h2>
                                <input className="inputPost" type="text" />
                            </div>
                            <div>
                                <h1>Content</h1>
                                <div className="contenedorTextArea">
                                    < Editor
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={onEditorStateChange}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    <div className="barraBuscadora">
                        <input type="text" />
                        <i class="fas fa-search"></i>
                    </div>

                    {post.map(post => <Post post={post} />)}
                </div>

            </main>


        </>
    )
}

export default Foro