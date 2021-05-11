const Dashboard = () => {

    const cursos = [
        { nombre: "zumba", foto: "http://baravdg.com/wp-content/uploads/2021/05/d8.jpg", nombre: "profesor", fecha: "17-05-2022", duration: "3 meses", dificultad: "extrema" }
    ]

    return (
        <div>
            {cursos.map(elemento => <div>
                <h1>{nombre}</h1>
            </div>)}
        </div>
    )
}

export default Dashboard