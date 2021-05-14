import AsideNav from "../components/AsideNav"
import Header from '../components/Header'
import CourseContainer from "../components/CourseContainer"
import NewCourse from "../components/NewCourse"

const Admin = () => {

    return (
        <>
            <div className="contenedorMenu">
                <AsideNav />
                <div className="contenedorWeb">
                    <Header />
                    <div className="adminContainer">

                        <CourseContainer />
                        <NewCourse />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin