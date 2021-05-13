import { useState } from "react"

const LessonText = (props) => {
    const [name, setName] = useState(props.lesson.lessonName)
    const [video, setVideo] = useState(props.lesson.videoLink)
    const [input, setInput] = useState(false)

    const readInputName = e => {
        const value = e.target.value
        setName(value)
    }

    const readInputVideo = e => {
        const value = e.target.value
        setVideo(value)
    }

    const sendData = () => {
        if (name.trim() !== props.lesson.lessonName || video.trim() !== props.lesson.videoLink) {
            const data = { lessonName: name, videoLink: video, id: props.lesson.lessonName }
            props.changeLesson(data)
            setInput(!input)
        } else {
            setInput(!input)
        }
    }

    const cancel = () => {
        setName(props.lesson.lessonName)
        setVideo(props.lesson.videoLink)
        setInput(!input)
    }

    return (
        <div className="lessonShow">
            <div className="categoryIcons">
                {input ? <i className="fas fa-pencil-alt" onClick={sendData} ></i> : <i className="fas fa-pencil-alt" onClick={() => setInput(!input)}></i>}
                {input ? <i className="far fa-times-circle" onClick={cancel} ></i> : <i className="far fa-times-circle" onClick={() => props.deleteLesson(name)} ></i>}
            </div>
            {input ? <input className="editInput" onChange={readInputName} autoFocus value={name} /> : <p>Lesson name: {props.lesson.lessonName}</p>}
            {input ? <input className="editInputVideo" onChange={readInputVideo} value={video} /> : <p className="editInputVideo">Video link: {props.lesson.videoLink}</p>}
        </div>
    )
}

export default LessonText