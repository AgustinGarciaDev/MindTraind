import { useState } from "react"

const Category = (props) => {
    const [input, setInput] = useState(false)
    const [data, setData] = useState([])

    const readInput = e => {
        const value = e.target.value
        setData(value)
    }

    const sendData = () => {
        console.log(data)
        setInput(!input)
    }

    return (
        <div className="categoryContainer">
            <div className="categoryIcons">
                {input ? <div onClick={sendData}>...</div> : <div onClick={() => setInput(!input)}>...</div>}
                <div>X</div>
            </div>
            { input ? <input onChange={readInput} /> : <p>{props.category}</p>}
        </div>
    )
}

export default Category