import CardJob from '../components/CardJob'
import NavBarDashBoard from '../components/NavBarDashBoard'
import AsideNav from '../components/AsideNav'
const Jobs = () => {

    const jobs = [
        { img: "https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo.jpg", title: "Organizador", modalidad: "part time", nameOffered: "Accenture", email: "hola@gmail.com", infoJobs: "este es un trabajo a medio tiempo" },
        { img: "https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo.jpg", title: "Organizador", modalidad: "part time", nameOffered: "Accenture", email: "hola@gmail.com", infoJobs: "este es un trabajo a medio tiempo" },
        { img: "https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo.jpg", title: "Organizador", modalidad: "part time", nameOffered: "Accenture", email: "hola@gmail.com", infoJobs: "este es un trabajo a medio tiempo" },
        { img: "https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo.jpg", title: "Organizador", modalidad: "part time", nameOffered: "Accenture", email: "hola@gmail.com", infoJobs: "este es un trabajo a medio tiempo" },

    ]
    return (
        <>
            <div className="contenedorMenu">
                <AsideNav />
                <div className="contenedorWeb">
                    <NavBarDashBoard />
                    <div className="heroJobs">
                        <h1>Jobs</h1>
                    </div>
                    <div className="contenedorPrincipalCardsJobs">
                        {jobs.map(job => <CardJob job={job} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Jobs