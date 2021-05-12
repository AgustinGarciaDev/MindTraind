const SuscribeCardCourse = (props) => {

    const userPic = "http://baravdg.com/wp-content/uploads/2021/05/1.jpg"
    const { curso: { fecha, duration, nameCourse, pictureRefence } } = props



    return (
        <div className="contenedorCurso">
            <div className="fotoCurso" style={{ backgroundImage: `url("${pictureRefence}")` }}></div>
            <div className="contenedorDatosCardCurso">
                <h2 className="tituloCurso">{nameCourse}</h2>
                <div className="contenedorInfoCurso">
                    <h2>Next date</h2>
                    <p>{fecha}</p>
                </div>
                <div className="contenedorInfoCurso" >
                    <h2>Duration</h2>
                    <p>{duration}</p>
                </div>
                <div className="contenedorInfoCurso" >
                    <h2>Description</h2>
                    <p>Aca va ir la descripcion</p>
                </div>
            </div>
            <div className="contenedorBtnInscripcion">
                <button onClick={() => props.courseSubscription(props.curso)} className="btnDashBoard">Inscribirme!</button>
            </div>
        </div>
    )
}

export default SuscribeCardCourse