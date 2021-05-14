import { useState } from "react"

const Lesson = (props) => {
    const [input, setInput] = useState(false)
    const [data, setData] = useState({ newName: props.lesson.lessonName, newVideoLink: props.lesson.videoLink })

    const readInput = e => {
        const name = e.target.name
        const value = e.target.value
        setData({
            ...data,
            [name]: value
        })
    }

    const cancel = () => {
        setData({ newName: props.lesson.lessonName, newVideoLink: props.lesson.videoLink })
        setInput(!input)
    }

    const lessonUpdate = () => {
        props.updateLesson({ action: 'update', id: props.lesson._id, newName: data.newName, newVideoLink: data.newVideoLink })
        setInput(!input)
    }

    return (
        <div className="lessonShow">
            <div className="categoryIcons">
                {input ? <i className="fas fa-pencil-alt" onClick={lessonUpdate} ></i> : <i className="fas fa-pencil-alt" onClick={() => setInput(!input)} ></i>}
                {input ? <i className="far fa-times-circle" onClick={cancel} ></i> : <i className="far fa-times-circle" onClick={() => props.deleteLesson({ action: 'delete', id: props.lesson._id })} ></i>}
            </div>
            {
                input
                    ?
                    <>
                        <input className="editInput" name="newName" onChange={readInput} autoFocus value={data.newName} />
                        <input className="editInput" name="newVideoLink" onChange={readInput} value={data.newVideoLink} />
                    </>
                    :
                    <>
                        <p><label className="lessonNames">Leson name:</label> {props.lesson.lessonName}</p>
                        <p className="editInputVideo"><label className="lessonNames">Video link:</label> {props.lesson.videoLink}</p>
                    </>
            }
        </div>
    )
}

export default Lesson