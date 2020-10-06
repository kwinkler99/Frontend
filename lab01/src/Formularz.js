import React, {useState} from "react";


const Formularz = () => {
    const [text, setText] = useState("");
    const [list, setList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [warning, setWarning] = useState("");

    


    function addText_to_List(event) {
        let now = Date.now();
        if(text !== "" && date !== ""){
            setList([...list, {text, date}]);
            setDate("");
            setText("");
            setWarning("");
        }
        else if(Date.parse(date) < now){
            setWarning("UWAGA! Podano zla date");
        }
        else{
            setWarning("UWAGA! Nie zawarto tekstu lub daty");
        }
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
            <div>{warning}</div>
        </div>
    )
}




export default Formularz;