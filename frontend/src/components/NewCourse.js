import { useState } from "react"
import { connect } from "react-redux"
import coursesActions from "../redux/actions/coursesActtions"
import { showToast } from '../helpers/myToast'
import CategoryText from "../components/CategoryText"
import LessonText from "../components/LessonText"

const NewCourse = (props) => {

    const [course, setCourse] = useState({ nameCourse: '', categories: [], email: '', pictureRefence: '', programDescription: '', lessons: [], duration: '', difficulty: '' })
    const [category, setCategory] = useState({ name: '' })
    const [lesson, setLesson] = useState({ lessonName: '', videoLink: '' })
    const [error, setError] = useState({})
    const errorsImput = { nameCourse: null, email: null, categories: null, pictureRefence: null, programDescription: null, duration: null, difficulty: null, lessons: null }

    const readInput = e => {
        const value = e.target.value
        const name = e.target.name
        setCourse({
            ...course,
            [name]: value
        })
    }

    const createCategory = e => {
        const value = e.target.value
        const name = e.target.name
        setCategory({
            [name]: value
        })
    }

    const createLesson = e => {
        const value = e.target.value
        const name = e.target.name
        setLesson({
            ...lesson,
            [name]: value
        })
    }

    const addCategory = () => {
        if (category.name.trim() === '') {
            showToast('error', "You cant add an empy category")
        } else {
            course.categories.push(category)
            setCategory({ name: '' })
        }
    }

    const addLesson = () => {
        if (lesson.videoLink.trim() === '' || lesson.lessonName.trim() === '') {
            showToast('error', "You cant add an empy lesson")
        } else {
            course.lessons.push(lesson)
            setLesson({ lessonName: '', videoLink: '' })
        }
    }

    const sendData = async e => {
        e.preventDefault()
        if (course.categories.length === 0 || course.lessons.length === 0) {
            showToast('error', "You cant send an empy form")
        } else {
            const response = await props.addCourse(course)
            if (response.data.success) {
                showToast('success', 'Course added successfully')
                setCourse({ nameCourse: '', categories: [], email: '', pictureRefence: '', programDescription: '', lessons: [], duration: '', difficulty: '' })
            } else {
                if (response.data.error.details) {
                    response.data.error.details.map(error => {
                        errorsImput[error.path[0]] = error.message
                        return null
                    })
                    setError(errorsImput)
                }else{
                    console.log(response)
                }
            }
        }
    }

    const changeCategory = (data) => {
        if (data.text.trim() !== '') {
            course.categories.map(category => {
                if (category.name === data.data) {
                    category.name = data.text
                    return category
                }
                return null
            })
        }
    }

    const deleteCategory = (data) => {
        setCourse({
            ...course,
            categories: course.categories.filter(category => category.name !== data)
        })
    }

    const changeLesson = (data) => {
        course.lessons.map(lesson => {
            if (lesson.lessonName === data.id) {
                lesson.lessonName = data.lessonName
                lesson.videoLink = data.videoLink
                return lesson
            }
            return null
        })
    }

    const deleteLesson = (data) => {
        setCourse({
            ...course,
            lessons: course.lessons.filter(lesson => lesson.lessonName !== data)
        })
    }

    return (
        <div className="newCourseContainer">
            <form className="newCourseForm">
                <h3 className="h3Form">Add new course</h3>

                <input className="newInput" type="text" placeholder="Course name" name="nameCourse" value={course.nameCourse} onChange={readInput} />
                {error.nameCourse && <small>{error.nameCourse}</small>}

                <input className="newInput" type="text" placeholder="Program description" name="programDescription" value={course.programDescription} onChange={readInput} />
                {error.programDescription && <small>{error.programDescription}</small>}

                <input className="newInput" type="text" placeholder="Coach email " name="email" value={course.email} onChange={readInput} />
                {error.email && <small>{error.email}</small>}

                <input className="newInput" type="text" placeholder="Picture refence " name="pictureRefence" value={course.pictureRefence} onChange={readInput} />
                {error.pictureRefence && <small>{error.pictureRefence}</small>}

                <input className="newInput" type="number" placeholder="Duration" name="duration" value={course.duration} onChange={readInput} />
                {error.duration && <small>{error.duration}</small>}

                <input className="newInput" type="number" placeholder="Difficulty" name="difficulty" value={course.difficulty} onChange={readInput} />
                {error.difficulty && <small>{error.difficulty}</small>}

                <h3 className="h3Form">Categories</h3>
                <div className="categoryNew">
                    <div className="lessonInputError">
                        <input className="newInput" type="text" placeholder="categories" onChange={createCategory} name="name" value={category.name} />
                        {error.categories && <small>{error.categories}</small>}
                    </div>
                    <i className="fas fa-plus" onClick={addCategory}></i>
                </div>
                <div className="newCategories">
                    {
                        course.categories.map(category => <CategoryText deleteCategory={deleteCategory} changeCategory={changeCategory} key={category.name} category={category} />)
                    }
                </div>
                <h3 className="h3Form">Lessons</h3>
                <div className="lessonsNew">
                    <div className="lessonInput">
                        <div className="lessonInputError">
                            <input className="newInput" type="text" placeholder="lesson name" onChange={createLesson} name="lessonName" value={lesson.lessonName} />
                            <input className="newInput" type="text" placeholder="video" onChange={createLesson} name="videoLink" value={lesson.videoLink} />
                            {error.lessons && <small>{error.lessons}</small>}
                        </div>
                    </div>
                    <i className="fas fa-plus" onClick={addLesson}></i>
                </div>
                <div className="newCategories">
                    {
                        course.lessons.map(lesson => <LessonText changeLesson={changeLesson} key={lesson.lessonName} lesson={lesson} deleteLesson={deleteLesson} />)
                    }
                </div>
                <div className="formButtons">
                    <button className="formButtonsNew" type="button" onClick={() => props.setShow()}>Go back</button>
                    <button className="formButtonsNew" type="button" onClick={sendData}>Add</button>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addCourse: coursesActions.addCourse
}

export default connect(null, mapDispatchToProps)(NewCourse)