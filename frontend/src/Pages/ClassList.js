import NavBarDashBoard from '../components/NavBarDashBoard'
import Class from '../components/Class'
const ClassList = () => {
    const clases = [
        { name: "clase 1", videoclase: "https://www.youtube.com/embed/DiBmqCze5Uk" },
        { name: "clase 2", videoclase: "https://www.youtube.com/embed/DiBmqCze5Uk" },
        { name: "clase 3", videoclase: "https://www.youtube.com/embed/erzfY5eswpM" },
        { name: "clase 4", videoclase: "https://www.youtube.com/embed/erzfY5eswpM" },
    ]
    return (
        <>
            <NavBarDashBoard />
            <div>
                <h2>Program Course</h2>
            </div>
            <div className="classContainer">
                {clases.map(clase => <Class clase={clase} />)}
            </div>
        </>

    )
}

export default ClassList