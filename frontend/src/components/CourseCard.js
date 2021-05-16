import { Link } from 'react-router-dom'
const CourseCard = (props) => {

    console.log(props)


    const { curso: { nameCourse, pictureRefence, coach: { firstName, lastName, profilePicture } } } = props



    return (
        <div className="contenedorCursoDashboard">
            <div className="fotoCurso" style={{ backgroundImage: `url("${pictureRefence}")` }}></div>
            <div className="contenedorDatosCursoDashBoard">
                <h2 className="tituloCursoDashboard">{nameCourse}</h2>
                <div className="fotoProfesorNombre">
                    <div className="fotoProfesor" style={{ backgroundImage: `url("${profilePicture}")` }}></div>
                    <h2 className="nombreProfesor">{firstName} {lastName}</h2>
                </div>
            </div>
            <div className="contenedorBtn">
                <Link to={`/class/${props.curso._id}`} ><button className="btnDashBoard">Go course!</button></Link>
            </div>
        </div>
    )
}

export default CourseCard