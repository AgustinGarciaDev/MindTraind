import axios from 'axios'
import { useState, useEffect } from 'react'

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

    const sendData = () => {
        console.log(job)
    }


    return (
        <div className="newCourseContainer">
            <form className="newCourseForm">

                <input className="newInput" type="text" placeholder="Offerent name" name="nameOfferent" value={job.nameOfferent} onChange={readInput} />
                <input className="newInput" type="text" placeholder="Email" name="email" value={job.email} onChange={readInput} />
                <input className="newInput" type="text" placeholder="Job tittle " name="jobTittle" value={job.jobTittle} onChange={readInput} />
                <input className="newInput" type="text" placeholder="Image link" name="urlImage" value={job.urlImage} onChange={readInput} />
                <input className="newInput" type="text" placeholder="Description" name="description" value={job.description} onChange={readInput} />
                <select className="newInput" name="country" value={job.country} onChange={readInput}>
                    <option value="default">Choose your country</option>
                    {
                        options.map(option => <option key={option.name} value={option.name}>{option.name}</option>)
                    }
                </select>
                <select name="typeJob" value={job.typeJob} onChange={readInput} className="newInput">
                    <option value="default">Type of job</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Full-Time">Full-Time</option>
                </select>
                <select name="modality" value={job.modality} onChange={readInput} className="newInput">
                    <option value="default">Modality</option>
                    <option value="Remote">Remote</option>
                    <option value="presential">presential</option>
                </select>
                <div className="formButtons">
                    <button className="formButtonsNew" type="button" onClick={() => props.handleClose()}>Go back</button>
                    <button className="formButtonsNew" type="button" onClick={sendData} >Add</button>
                </div>

            </form>
        </div>
    )
}

export default EditJob