const SuscribeCardCourse = (props) => {

    const userPic = "http://baravdg.com/wp-content/uploads/2021/05/1.jpg"
    const { nameCourse, pictureRefence, programDescription, duration, difficulty } = props.course
    return (
        <div className="contenedorCurso">
            <div className="fotoCurso" style={{ backgroundImage: `url("${pictureRefence}")` }}></div>
            <div className="contenedorDatosCardCurso">
                <h2 className="tituloCurso">{nameCourse}</h2>
                <div className="contenedorInfoCurso" >
                    <h2>Duration</h2>
                    <p>{duration}semanas</p>
                </div>
                <div className="contenedorInfoCurso" >
                    <h2>Description</h2>
                    <p>{programDescription}</p>
                </div>
                <div className="contenedorInfoCurso" >
                    <h2>Dificultad</h2>
                    <p>{difficulty}</p>
                </div>
            </div>
            <div className="contenedorBtnInscripcion">
                <button onClick={() => props.courseSubscription(props.course)} className="btnDashBoard">More information</button>
            </div>
        </div>
    )
}


export default SuscribeCardCourse