import { useState } from 'react'
import EditCourse from '../components/EditCourse'

const Course = (props) => {
    const [edit, setEdit] = useState(false)

    const cancel = () => {
        setEdit(!edit)
    }
    return (
        <>
            {
                !edit
                    ?
                    <p onClick={() => setEdit(!edit)}>. . .</p>
                    :
                    <EditCourse course={props.course} setEdit={setEdit} cancel={cancel} />
            }
            <div className="courseCardContainer" style={{ backgroundImage: `url('${props.course.pictureRefence}')` }}>
                <h4>{props.course.nameCourse}</h4>
            </div>
        </>
    )
}

export default Course