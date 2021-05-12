import NavBarDashBoard from '../components/NavBarDashBoard'
import Class from '../components/Class'
const ClassList = () => {
    const clases = [
        { name: "clase 1", videoclase: "https://youtu.be/DiBmqCze5Uk" },
        { name: "clase 1", videoclase: "https://youtu.be/DiBmqCze5Uk" },
        { name: "clase 1", videoclase: "https://youtu.be/DiBmqCze5Uk" },
        { name: "clase 1", videoclase: "https://youtu.be/DiBmqCze5Uk" },
    ]
    return (
        <>
            <NavBarDashBoard />
            <div>
                <h2>Program Course</h2>
            </div>
            {
                clases.map(clase => <Class clase={clase} />)
            }
        </>

    )
}

export default ClassList