import { useState } from "react"

const CategoryText = (props) => {
    const [text, setText] = useState(props.category.name)
    const [input, setInput] = useState(false)

    const readInput = e => {
        const value = e.target.value
        setText(value)
    }

    const sendData = () => {
        if (text.trim() !== props.category.name) {
            const data = { text: text, data: props.category.name }
            props.changeCategory(data)
            setInput(!input)
        } else {
            setInput(!input)
        }
    }

    const cancel = () => {
        setText(props.category.name)
        setInput(!input)
    }

    return (
        <div className="categoriesShow">
            <div className="categoryIcons">
                {input ? <i className="fas fa-pencil-alt" onClick={sendData}></i> : <i className="fas fa-pencil-alt" onClick={() => setInput(!input)}></i>}
                {input ? <i className="far fa-times-circle" onClick={cancel}></i> : <i className="far fa-times-circle" onClick={() => props.deleteCategory(text)}></i>}
            </div>
            {input ? <input className="editInput" onChange={readInput} autoFocus value={text} /> : <p>{props.category.name}</p>}
        </div>
    )
}

export default CategoryText