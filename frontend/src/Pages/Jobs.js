import CardJob from '../components/CardJob'
import NavBarDashBoard from '../components/NavBarDashBoard'
import AsideNav from '../components/AsideNav'
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
            <div className="contenedorMenu">
                <AsideNav />
                <div className="contenedorWeb">
                    <NavBarDashBoard />
                    <div className="heroJobs">
                        <h1>Jobs</h1>
                    </div>
                    <div className="contenedorPrincipalCardsJobs">
                        {loader
                            ?
                            <Spinner animation="border" role="status" />
                            :
                            props.jobs.map(job => <CardJob job={job} />)}
                    </div>
                </div>
            </div>
        </>
    )
}


const mapStateToProps = state => {
    console.log(state)
    return {
        jobs: state.jobs.jobs
    }
}

const mapDispatchToProps = {
    getJobs: jobsActions.getJobs
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)