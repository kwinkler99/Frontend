import React, {useState} from "react";


const Formularz = (props) => {
    const [text, setText] = useState("");
    const [list, setList] = useState([]);
    const [date, setDate] = useState("")

    function addText_to_List(event) {
        setList([...list, {text, date}]);
        setDate("")
        setText("")
    }





    return(
        <div>
            <div>
                Lista TO-DO:
                {list
                .map(choose => (
                <div>{choose.text}, {choose.date}</div>
                ))}
            </div>
            <form>
                <input 
                    type = "text"
                    value = {text}
                    onChange ={(event) => {setText(event.target.value)}}/>
                <input
                    type ="date"
                    value = {date}
                    onChange= {(event) => {setDate(event.target.value)}}
                />
                <input 
                    type = "button" 
                    onClick = {addText_to_List}
                    value ="Zatwierdz"/>
            </form>
        </div>
    )
}




export default Formularz;