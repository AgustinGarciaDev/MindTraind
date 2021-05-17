const SuscribeCardCourse = (props) => {


    const { nameCourse, pictureRefence } = props.course
    return (
        <div className={"contenedorCurso"}>
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