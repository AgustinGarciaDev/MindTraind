import { useEffect, useState } from "react"
import { connect } from "react-redux"
import JobActions from '../redux/actions/jobActions'
import { showToast } from '../helpers/myToast'
import axios from 'axios'

const NewCourse = (props) => {
    const [job, setJob] = useState({ nameOfferent: '', email: '', description: '', urlImage: '', jobTittle: '', country: '', typeJob: '', modality: '' })
    const [error, setError] = useState({})
    const errorsImput = { nameOfferent: null, email: null, description: null, urlImage: null, jobTittle: null, country: null, typeJob: null, modality: null }
    const [options, setOptions] = useState([])

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
    }

    const sendData = async e => {
        e.preventDefault()
        const response = await props.addJob(job)
        if (response) {
            if (response.data.succes === false) {
                response.data.error.details.map(error => {
                    errorsImput[error.context.label] = error.message
                    return null
                })
                setError(errorsImput)
            } else {
                showToast('success', 'Job added successfully')
                setJob({ nameOfferent: '', email: '', description: '', urlImage: '', jobTittle: '', country: '', typeJob: '', modality: '' })
                setError({})
            }
        }
    }

    return (
        <div className="newCourseContainer">
            <form className="newCourseForm">
                <h3 className="h3Form">Add new Job</h3>

                <input className="newInput" type="text" placeholder="Offerent name" name="nameOfferent" value={job.nameOfferent} onChange={readInput} />
                {error.nameOfferent && <small>{error.nameOfferent}</small>}

                <input className="newInput" type="text" placeholder="Email" name="email" value={job.email} onChange={readInput} />
                {error.email && <small>{error.email}</small>}

                <input className="newInput" type="text" placeholder="Job tittle " name="jobTittle" value={job.jobTittle} onChange={readInput} />
                {error.jobTittle && <small>{error.jobTittle}</small>}

                <input className="newInput" type="text" placeholder="Image link" name="urlImage" value={job.urlImage} onChange={readInput} />
                {error.urlImage && <small>{error.urlImage}</small>}

                <input className="newInput" type="text" placeholder="Description" name="description" value={job.description} onChange={readInput} />
                {error.description && <small>{error.description}</small>}

                <select className="newInput" name="country" value={job.country} onChange={readInput}>
                    <option value="default">Choose your country</option>
                    {
                        options.map(option => <option key={option.name} value={option.name}>{option.name}</option>)
                    }
                </select>
                {error.country && <small>{error.country}</small>}

                <select name="typeJob" value={job.typeJob} onChange={readInput} className="newInput">
                    <option value="default">Type of job</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Full-Time">Full-Time</option>
                </select>
                {error.typeJob && <small>{error.typeJob}</small>}

                <select name="modality" value={job.modality} onChange={readInput} className="newInput">
                    <option value="default">Modality</option>
                    <option value="Remote">Remote</option>
                    <option value="presential">presential</option>
                </select>
                {error.modality && <small>{error.modality}</small>}

                <div className="formButtons">
                    <button className="formButtonsNew" onClick={() => props.setShow()}>Go back</button>
                    <button className="formButtonsNew" onClick={sendData}>Add</button>
                </div>

            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addJob: JobActions.addJob
}

export default connect(null, mapDispatchToProps)(NewCourse)