import { useState } from "react"

const Category = (props) => {
    const [input, setInput] = useState(false)
    const [data, setData] = useState(props.category.name)
    
    const readInput = e => {
        const value = e.target.value
        setData(value)
    }

    const sendData = () => {
        if (data.trim() !== props.category.name && data.trim() !== '') {
            props.addCategory({ action: 'update', id: props.category._id, text: data, id: props.category._id })
            setInput(!input)
            
        } else {
            setInput(!input)
        }
    }

    const keyPress = (e) => {
        e.key === 'Enter' && sendData()
    }

    const cancel = () => {
        setData(props.category.name)
        setInput(!input)
    }

    return (
        <div className="categoriesShow">
            <div className="categoryIcons">
                {input ? <i className="fas fa-pencil-alt" onClick={sendData}></i> : <i className="fas fa-pencil-alt" onClick={() => setInput(!input)}></i>}
                {input ? <i className="far fa-times-circle" onClick={cancel}></i> : <i className="far fa-times-circle" onClick={() => props.addCategory({ action: 'delete', id: props.category._id })}></i>}
            </div>
            { input ? <input className="editInput" onKeyPress={keyPress} onChange={readInput} autoFocus value={data} /> : <p>{props.category.name}</p>}
        </div>
    )
}

export default Category