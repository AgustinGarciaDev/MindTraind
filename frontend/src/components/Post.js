
const Post = (props) => {

    console.log(props)

    const { apellido, name, titulo, comment, foto } = props.post

    console.log(titulo)

    return (
        <div className="contenedorPost">
            <h2>{titulo}</h2>
            <div>
                <img className="comentarioFotoUser" src={foto} alt="" />
                <div>
                    <h3>{name}</h3>
                    <h3>{apellido}</h3>
                </div>
            </div>
        </div>
    )
}

export default Post