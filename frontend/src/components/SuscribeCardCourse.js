const SuscribeCardCourse = (props) => {

    const userPic = "http://baravdg.com/wp-content/uploads/2021/05/1.jpg"
    const { nameCourse, pictureRefence, programDescription, duration, difficulty } = props.course
    return (
        <div className="contenedorCurso">
            <div className="fotoCurso" style={{ backgroundImage: `url("${pictureRefence}")` }}></div>
            <div className="contenedorDatosCardCurso">
                <h2 className="tituloCurso">{nameCourse}</h2>
            </div>
            <div className="contenedorBtnInscripcion">
                <button onClick={() => props.courseSubscription(props.course)} className="btnDashBoard">More information</button>
            </div>
        </div>
    )
}


export default SuscribeCardCourse