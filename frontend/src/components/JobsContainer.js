import { connect } from "react-redux"
import Spinner from 'react-bootstrap/Spinner'
import { useEffect, useState } from "react"
import jobsActions from '../redux/actions/jobActions'
import Job from "./Job"

const JobsContainer = (props) => {
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (props.jobs.length === 0) {
            props.getJobs()
        } else {
            setLoader(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.jobs])

    return (
        <div className="courseBigContainer">
            <h3 className="h3Form">Jobs</h3>
            <div className="courseContainer">
                {
                    loader
                        ?
                        <Spinner animation="border" role="status" />
                        :
                        props.jobs.map(job => <Job job={job} key={job._id} />)
                }
            </div>
            <button className="formButtonsNew" onClick={() => props.setShow()}>Go back</button>
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