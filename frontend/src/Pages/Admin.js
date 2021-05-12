import { useEffect, useState } from "react"
import Course from '../components/Course'
import Spinner from 'react-bootstrap/Spinner'
import { connect } from "react-redux"
import coursesActions from "../redux/actions/coursesActtions"
import { showToast } from '../helpers/myToast'
import CategoryText from "../components/CategoryText"

const Admin = (props) => {
    const [loader, setLoader] = useState(true)
    const [course, setCourse] = useState({ nameCourse: '', categories: [], coach: '', pictureRefence: '', programDescription: '', lessons: [], duration: '', difficulty: '' })
    const [category, setCategory] = useState({ name: '' })
    const [lesson, setLesson] = useState({ lessonName: '', videoLink: '' })
    const [error, setError] = useState({})
    const errorsImput = { nameCourse: null, coach: null, categories: null, pictureRefence: null, programDescription: null, duration: null, difficulty: null, lessons: null }

    useEffect(() => {
        if (props.coursesList.length === 0) {
            props.getCourses()
        }
        if (props.coursesList.length !== 0) {
            setLoader(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.coursesList])

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
            showToast('error', "probando")
        } else {
            const response = await props.addCourse(course)
            if (response.data.success) {
                setCourse({ nameCourse: '', categories: [], coach: '', pictureRefence: '', programDescription: '', lessons: [], duration: '', difficulty: '' })
            } else {
                console.log(response.data.error.details)
                response.data.error.details.map(error => {
                    errorsImput[error.path[0]] = error.message
                    return null
                })
                setError(errorsImput)
            }
        }
    }

    const changeCategory = (data) => {
        if (data.text.trim() !== '') {
            course.categories.map(category => {
                if (category.name === data.data) {
                    category.name= data.text
                    return category
                }
            })
        }
    }

    return (
        <>
            <div className="adminContainer">
                <h2>Courses</h2>
                <p>aca podria haber un filtro para facilitar la busqueda</p>
                <div className="courseContainer">
                    {
                        loader
                            ?
                            <Spinner animation="border" role="status" />
                            :
                            props.coursesList.map(course => <Course key={course._id} course={course} />)
                    }
                </div>
                <h3>Add new course</h3>
                <div className="newCourseContainer">
                    <form className="newCourseForm">

                        <input type="text" placeholder="Course name" name="nameCourse" value={course.nameCourse} onChange={readInput} />
                        {error.nameCourse && <small>{error.nameCourse}</small>}

                        <input type="text" placeholder="Program description" name="programDescription" value={course.programDescription} onChange={readInput} />
                        {error.programDescription && <small>{error.programDescription}</small>}

                        <input type="text" placeholder="Coach " name="coach" value={course.coach} onChange={readInput} />
                        {error.coach && <small>{error.coach}</small>}

                        <input type="text" placeholder="Picture refence " name="pictureRefence" value={course.pictureRefence} onChange={readInput} />
                        {error.pictureRefence && <small>{error.pictureRefence}</small>}

                        <input type="number" placeholder="Duration" name="duration" value={course.duration} onChange={readInput} />
                        {error.duration && <small>{error.duration}</small>}

                        <input type="number" placeholder="Difficulty" name="difficulty" value={course.difficulty} onChange={readInput} />
                        {error.difficulty && <small>{error.difficulty}</small>}

                        <h3>Categories</h3>
                        <div className="categoryNew">
                            <div className="lessonInputError">
                                <input type="text" placeholder="categories" onChange={createCategory} name="name" value={category.name} />
                                {error.categories && <small>{error.categories}</small>}
                            </div>
                            <i className="fas fa-plus" onClick={addCategory}></i>
                        </div>
                        <div className="newCategories">
                            {
                                course.categories.map(category => <CategoryText changeCategory={changeCategory} key={category.name} category={category} />)
                            }
                        </div>
                        <h3>Lessons</h3>
                        <div className="lessonsNew">
                            <div className="lessonInput">
                                <div className="lessonInputError">
                                    <input type="text" placeholder="lesson name" onChange={createLesson} name="lessonName" value={lesson.lessonName} />
                                    <input type="text" placeholder="video" onChange={createLesson} name="videoLink" value={lesson.videoLink} />
                                    {error.lessons && <small>{error.lessons}</small>}

                                </div>
                            </div>
                            <i className="fas fa-plus" onClick={addLesson}></i>
                        </div>
                        <div className="newCategories">
                            {
                                course.lessons.map(lesson => <div className="lessonShow" key={lesson.lessonName}><p>{lesson.lessonName}</p></div>)
                            }
                        </div>
                        <button onClick={sendData}>Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        coursesList: state.courses.courses
    }
}

const mapDispatchToProps = {
    getCourses: coursesActions.getCourses,
    addCourse: coursesActions.addCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)