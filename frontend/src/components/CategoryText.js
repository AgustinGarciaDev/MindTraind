import { useState } from "react"

const CategoryText = (props) => {
    const [text, setText] = useState(props.category.name)
    const [input, setInput] = useState(false)

    const readInput = e => {
        const value = e.target.value
        setText(value)
    }

    const sendData = () =>{
        const data= {text: text, data: props.category.name}
        props.changeCategory(data)
        setInput(!input)
    }

    return (
        <div className="categoriesShow">
            <div className="categoryIcons">
                {input ? <div onClick={sendData}>...</div> : <div onClick={() => setInput(!input)}>...</div>}
                <div>X</div>
            </div>
            {input ? <input className="editInput" onChange={readInput} autoFocus value={text} /> : <p>{props.category.name}</p>}
        </div>
    )
}

export default CategoryText