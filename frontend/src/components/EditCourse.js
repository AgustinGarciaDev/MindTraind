import { useState } from 'react'
import { connect } from "react-redux"
import coursesActions from "../redux/actions/coursesActtions"
import Category from './Category'
import Lesson from './Lesson'
import { showToast } from '../helpers/myToast'

const EditCourse = (props) => {
    const [course, setCourse] = useState({})
    const [input, setInput] = useState(false)
    const [newCategory, setNewCategory] = useState({ name: '' })
    const [newLesson, setNewLesson] = useState({ newName: '', newVideoLink: '' })

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        if (name !== 'name') {
            setCourse({
                ...course,
                [name]: value
            })
        } else {
            setNewCategory({
                [name]: value
            })
        }
        console.log(course)
    }

    const createNewLesson = e => {
        const value = e.target.value
        const name = e.target.name
        setNewLesson({
            ...newLesson,
            [name]: value
        })
    }

    const deleteLesson = e => {
        console.log(e)
        const data = {  idCourse: props.course._id, action: e.action, idLesson: e.id  }
        props.modifyLesson(data)
    }
    
    const updateLesson = e => {
        const data = {  idCourse: props.course._id, action: e.action, idLesson: e.id, newName: e.newName, newVideoLink: e.newVideoLink  }
        props.modifyLesson(data)
    }

    const addLesson = async (e) => {
        const data = { ...newLesson, idCourse: props.course._id, action: e }
        if (newLesson.newName.trim() !== '' && newLesson.newVideoLink.trim() !== '') {
            props.modifyLesson(data)
        }
    }

    const sendData = async (e) => {
        e.preventDefault()
        const data = { ...course, id: props.course._id }
        const response = await props.editCourse(data)
        if (response) {
            showToast('success', "The changes were saved")
        }
    }


    const addCategory = async (e) => {
        if (e.action === 'add') {
            if (newCategory.name && newCategory.name.trim() !== '') {
                const data = { idCourse: props.course._id, action: e.action, newNameCategory: newCategory.name }
                const response = await props.modifyCategory(data)
                if (response) {
                    setNewCategory({ name: '' })

                }
                setInput(!input)
            } else {
                setInput(!input)
            }
        } else {
            const data = { idCourse: props.course._id, idCategory: e.id, action: e.action, newNameCategory: e.text }
            await props.modifyCategory(data)
        }
        setInput(!input)
    }

    return (
        <>
            <div className="editCourseContainer">

                <form className="editForm">
                    <input type="text" placeholder="Course name" name="nameCourse" onChange={readInput} />
                    <input type="text" placeholder="Program description" name="programDescription" onChange={readInput} />
                    <input type="text" placeholder="Coach " name="coach" onChange={readInput} />
                    <input type="text" placeholder="Picture refence " name="pictureRefence" onChange={readInput} />
                    <input type="text" placeholder="Duration" name="duration" onChange={readInput} />
                    <input type="text" placeholder="Difficulty" name="difficulty" onChange={readInput} />
                    <h3 className="h3Form">Categorys</h3>
                    <div className="categoryNew">
                        <input onChange={readInput} name="name" placeholder="Category name" value={newCategory.name} />
                        <i className="fas fa-plus" onClick={() => addCategory({ action: 'add' })}></i>
                    </div>
                    <div className="category">
                        {
                            props.course.categories.map(category => <Category addCategory={addCategory} key={category._id} category={category} />)
                        }
                    </div>
                    <h3 className="h3Form">Lessons</h3>
                    <div className="lessonsNew">
                        <div className="lessonInput">
                            <div className="lessonInputError">
                                <input type="text" placeholder="lesson name" name="newName" onChange={createNewLesson} value={newLesson.newName} />
                                <input type="text" placeholder="video" name="newVideoLink" onChange={createNewLesson} value={newLesson.newVideoLink} />
                            </div>
                        </div>
                        <i className="fas fa-plus" onClick={() => addLesson('add')}></i>
                    </div>
                    <div className="category">
                        {
                            props.course.lessons.map(lesson => <Lesson key={lesson._id} lesson={lesson} deleteLesson={deleteLesson} updateLesson={updateLesson} />)
                        }
                    </div>
                    <div className="formButtons">
                        <button className="formButtonsEdit" onClick={sendData} >Send</button>
                    </div>
                </form>

            </div>
        </>
    )
}

const mapDispatchToProps = {
    editCourse: coursesActions.editCourse,
    modifyCategory: coursesActions.modifyCategory,
    modifyLesson: coursesActions.modifyLesson
}

export default connect(null, mapDispatchToProps)(EditCourse)