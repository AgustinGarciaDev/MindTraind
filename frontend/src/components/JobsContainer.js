import { connect } from "react-redux"
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from "react"
import jobsActions from '../redux/actions/jobActions'
import Job from "./Job"
import Header from '../components/Header'
import { Link } from 'react-router-dom'


const JobsContainer = (props) => {
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (props.jobs.length === 0) {
            props.getJobs()
        } else {
            setLoader(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.jobs])

    return (
        <div className="contenedorMenu">
            <div className="contenedorWeb">
                <Header />
                <div className="courseBigContainer" style={{backgroundImage:`url('https://baravdg.com/wp-content/uploads/2021/05/rayas-red-izq-1.png')`}}>
                    <h3 className="h3tittle">Jobs</h3>
                    <div className="courseContainer">
                        {
                            loader
                                ?
                                <Spinner animation="border" role="status" />
                                :
                                props.jobs.map(job => <Job job={job} key={job._id} />)
                        }
                    </div>
                    <Link className="formButtonsNew" to="/admin" type="button" >Go back</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        jobs: state.jobs.jobs
    }
}

const mapDispatchToProps = {
    getJobs: jobsActions.getJobs
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsContainer)