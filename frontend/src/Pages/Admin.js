import { useEffect, useState } from "react"
import Course from '../components/Course'
import Spinner from 'react-bootstrap/Spinner'
import { connect } from "react-redux"
import coursesActions from "../redux/actions/coursesActtions"
import { showToast } from '../helpers/myToast'

const Admin = (props) => {
    const [loader, setLoader] = useState(true)
    const [course, setCourse] = useState({ nameCourse: '', category: [], coach: '', pictureRefence: '', programDescription: '', lessons: [], duration: '', difficulty: '' })
    const [category, setCategory] = useState({ name: '' })
    const [lesson, setLesson] = useState({ lessonName: '', videoLink: '' })

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
            course.category.push(category)
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
        const response = await props.addCourse(course)
        if (response) {
            setCourse({ nameCourse: '', category: [], coach: '', pictureRefence: '', programDescription: '', lessons: [], duration: '', difficulty: '' })
        } else {
            alert("funciona")
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
                        <input type="text" placeholder="Program description" name="programDescription" value={course.programDescription} onChange={readInput} />
                        <input type="text" placeholder="Coach " name="coach" value={course.coach} onChange={readInput} />
                        <input type="text" placeholder="Picture refence " name="pictureRefence" value={course.pictureRefence} onChange={readInput} />
                        <input type="text" placeholder="Duration" name="duration" value={course.duration} onChange={readInput} />
                        <input type="text" placeholder="Difficulty" name="difficulty" value={course.difficulty} onChange={readInput} />
                        <h3>Categories</h3>
                        <div className="categoryNew">
                            <input type="text" placeholder="categories" onChange={createCategory} name="name" value={category.name} />
                            <i className="fas fa-plus" onClick={addCategory}></i>
                        </div>
                        <div className="newCategories">
                            {
                                course.category.map(category => <p key={category.name}>{category.name}</p>)
                            }
                        </div>
                        <h3>Lessons</h3>
                        <div className="lessonsNew">
                            <div className="lessonInput">
                                <input type="text" placeholder="lesson name" onChange={createLesson} name="lessonName" value={lesson.lessonName} />
                                <input type="text" placeholder="video" onChange={createLesson} name="videoLink" value={lesson.videoLink} />
                            </div>
                            <i className="fas fa-plus" onClick={addLesson}></i>
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