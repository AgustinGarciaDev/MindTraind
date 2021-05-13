import {Link} from 'react-router-dom'
const CourseCard = (props) => {

    const userPic = "http://baravdg.com/wp-content/uploads/2021/05/1.jpg"
    const nombreProfesor = "Juan Marquina"
    const { curso: { nameCourse, pictureRefence } } = props

    return (
        <div className="contenedorCurso">
            <div className="fotoCurso" style={{ backgroundImage: `url("${pictureRefence}")` }}></div>
            <div className="contenedorDatosCardCurso">
                <h2 className="tituloCurso">{nameCourse}</h2>
                <div className="fotoProfesorNombre">
                    <div className="fotoProfesor" style={{ backgroundImage: `url("${userPic}")` }}></div>
                    <h2 className="nombreProfesor">{nombreProfesor}</h2>
                </div>
            </div>
            <div className="contenedorBtn">
                <Link to = {`/class/${props.curso._id}`}  ><button className="btnDashBoard">Go course!</button></Link>
                
            </div>
        </div>
    )
}

export default CourseCard