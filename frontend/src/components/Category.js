import { useState } from "react"

const Category = (props) => {
    const [input, setInput] = useState(false)
    const [data, setData] = useState(props.categories.name)

    const readInput = e => {
        const value = e.target.value
        setData(value)
    }

    const sendData = () => {
        if (data.trim() !== props.categories.name) {
            const newDate = { id: props.categories._id, data }
            console.log(newDate)
            setInput(!input)
        } else {
            console.log("entro aca")
        }
    }

    const keyPress = (e) => {
        e.key === 'Enter' && sendData()
    }

    return (
        <div className="categoryContainer">
            <div className="categoryIcons">
                {input ? <div onClick={sendData}>...</div> : <div onClick={() => setInput(!input)}>...</div>}
                <div>X</div>
            </div>
            { input ? <input className="editInput" onKeyPress={keyPress} onChange={readInput} autoFocus value={data} /> : <p>{props.category.name}</p>}
        </div>
    )
}

export default Category