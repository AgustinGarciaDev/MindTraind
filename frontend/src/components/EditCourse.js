import { useState } from 'react'
import { connect } from "react-redux"
import coursesActions from "../redux/actions/coursesActtions"
import Category from './Category'

const EditCourse = (props) => {
    const [course, setCourse] = useState({})
    const [error, setError] = useState({})
    const errorsImput = { nameCourse: null, coach: null, category: null, pictureRefence: null, programDescription: null, duration: null, difficulty: null }

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        setCourse({
            ...course,
            [name]: value
        })
    }

    const sendData = async (e) => {
        e.preventDefault()
        const data = { ...course, id: props.course._id }
        const response = await props.editCourse(data)
        if (response) {
            props.cancel()
        }
    }

    const editCategory = (data) => {
        console.log(data)
    }
    
    return (
        <>
            <div className="editCourseContainer">
                <div>
                    <form className="courseForm">
                        <h3>Data</h3>
                        <input type="text" placeholder="Course name" name="nameCourse" onChange={readInput} />
                        <input type="text" placeholder="Program description" name="programDescription" onChange={readInput} />
                        <input type="text" placeholder="Coach " name="coach" onChange={readInput} />
                        <input type="text" placeholder="Picture refence " name="pictureRefence" onChange={readInput} />
                        <input type="text" placeholder="Duration" name="duration" onChange={readInput} />
                        <input type="text" placeholder="Difficulty" name="difficulty" onChange={readInput} />
                        <h3>Categorys</h3>
                        <div className="category">
                            {
                                props.course.categories.map(category => <Category editCategory={editCategory} key={category._id} category={category} />)
                            }
                        </div>
                        <div className="formButtons">
                            <button onClick={props.cancel}>Go back</button>
                            <button onClick={sendData} >Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    editCourse: coursesActions.editCourse
}

export default connect(null, mapDispatchToProps)(EditCourse)