import axios from 'axios'
import { useState, useEffect } from 'react'
import { connect } from "react-redux"
import JobActions from '../redux/actions/jobActions'
import { showToast } from '../helpers/myToast'

const EditJob = (props) => {
    const [job, setJob] = useState({
        nameOfferent: props.job.nameOfferent,
        email: props.job.email,
        description: props.job.description,
        urlImage: props.job.urlImage,
        jobTittle: props.job.jobTittle,
        country: props.job.country,
        typeJob: props.job.typeJob,
        modality: props.job.modality
    })
    const [btnVisible, setBtnVisible] = useState(false)
    const [options, setOptions] = useState([])
    const [error, setError] = useState({})
    const errorsImput = { nameOfferent: null, email: null, description: null, urlImage: null, jobTittle: null, country: null, typeJob: null, modality: null }

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => setOptions(response.data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        setJob({
            ...job,
            [name]: value
        })
        setBtnVisible(!btnVisible)
    }

    const sendData = async () => {
        const response = await props.updateJob({ job, id: props.job._id })
        if (response.data.success === true) {
            showToast('success', "The changes were saved")
            setError({})
        } else {
            response.data.error.details.map(error => {
                errorsImput[error.context.label] = error.message
                return null
            })
            setError(errorsImput)
        }
    }

    return (
        <div className="editCourseContainer">
            <form className="editForm">
                <p>Offerent name</p>
                <input className="newInput" type="text" placeholder="Offerent name" name="nameOfferent" value={job.nameOfferent} onChange={readInput} />
                {error.nameOfferent && <small>{error.nameOfferent}</small>}
                <p>Email</p>
                <input className="newInput" type="text" placeholder="Email" name="email" value={job.email} onChange={readInput} />
                {error.email && <small>{error.email}</small>}
                <p>Job Tittle</p>
                <input className="newInput" type="text" placeholder="Job tittle " name="jobTittle" value={job.jobTittle} onChange={readInput} />
                {error.jobTittle && <small>{error.jobTittle}</small>}
                <p>Image link</p>
                <input className="newInput" type="text" placeholder="Image link" name="urlImage" value={job.urlImage} onChange={readInput} />
                {error.urlImage && <small>{error.urlImage}</small>}
                <p>Description</p>
                <input className="newInput" type="text" placeholder="Description" name="description" value={job.description} onChange={readInput} />
                {error.description && <small>{error.description}</small>}

                <p>Country</p>
                <select className="newInput" name="country" value={job.country} onChange={readInput}>
                    <option  disabled value="default">Country</option>
                    {
                        options.map(option => <option key={option.name} value={option.name}>{option.name}</option>)
                    }
                </select>
                {error.country && <small>{error.country}</small>}

                <p>Type of job</p>
                <select name="typeJob" value={job.typeJob} onChange={readInput} className="newInput">
                    <option  disabled value="default">Type job</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Full-Time">Full-Time</option>
                </select>
                {error.typeJob && <small>{error.typeJob}</small>}

                <p>Modality</p>
                <select name="modality" value={job.modality} onChange={readInput} className="newInput">
                    <option  disabled value="default">Modality</option>
                    <option value="Remote">Remote</option>
                    <option value="presential">presential</option>
                </select>
                {error.modality && <small>{error.modality}</small>}

                <div className="formButtons">
                    {!btnVisible ? <button className="formButtonsNew" type="button" onClick={sendData} disabled >Add</button> : <button className="formButtonsNew" type="button" onClick={sendData} >Add</button>}
                </div>

            </form>
        </div>
    )
}

const mapDispatchToProps = {
    updateJob: JobActions.updateJob
}

export default connect(null, mapDispatchToProps)(EditJob)