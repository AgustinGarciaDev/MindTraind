import CardJob from '../components/CardJob'
import Header from '../components/Header'
import jobsActions from '../redux/actions/jobActions'
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner'

const Jobs = (props) => {
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
        <>

            <div className="contenedorWeb">
                <Header />
                <div className="heroJobs">
                    <h1>Jobs</h1>
                </div>
                <div className="contenedorPrincipalCardsJobs">
                    {loader
                        ?
                        <Spinner animation="border" role="status" />
                        :
                        props.jobs.map(job => <CardJob key={job._id} job={job} />)}
                </div>
            </div>

        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)