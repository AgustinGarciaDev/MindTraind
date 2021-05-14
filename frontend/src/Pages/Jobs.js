import CardJob from '../components/Job'
import NavBarDashBoard from '../components/NavBarDashBoard'
const Jobs = () => {

    const jobs = [
        { nameOffered: "Accenture", email: "hola@gmail.com", infoJobs: "este es un trabajo a medio tiempo" },
        { nameOffered: "Accenture", email: "hola@gmail.com", infoJobs: "este es un trabajo a medio tiempo" },
        { nameOffered: "Accenture", email: "hola@gmail.com", infoJobs: "este es un trabajo a medio tiempo" },
        { nameOffered: "Accenture", email: "hola@gmail.com", infoJobs: "este es un trabajo a medio tiempo" },

    ]
    return (
        <>
            <NavBarDashBoard />
            <div>

                <div>Hi!</div>
                <div>
                    {jobs.map(job => <CardJob job={job} />)}
                </div>
            </div>
        </>
    )
}

export default Jobs