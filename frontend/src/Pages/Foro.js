import NavBarDashBoard from '../components/NavBarDashBoard'
import Post from '../components/Post'
const Foro = () => {

    const nameUser = "Agustin"
    const post = [
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo" },
        { name: "agustin", apellido: "garcia", comment: "commentario nuevo" },
    ]

    return (
        <>
            <NavBarDashBoard />
            <main>
                <div>
                    <input type="text" />
                </div>
                <div>

                    <div>
                        <img className="logoDashBoard" src="http://baravdg.com/wp-content/uploads/2021/04/46.jpg" alt="" />
                        <h4>
                            Hola {nameUser} Queres compartir algo?
                        </h4>
                    </div>
                </div>
            </main>

            <div>
                {post.map(post => <Post post={post} />)}
            </div>
        </>
    )
}

export default Foro