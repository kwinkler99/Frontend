import React, {useState} from "react";
import ToDo from './to-do.js'


const Formularz = () => {
    const [text, setText] = useState("");
    const [list, setList] = useState([]);
    const [reload, setReload] = useState("")
    const [date, setDate] = useState("");
    const [warning_date, setWarning_Date] = useState("");
    const [warning_text, setWarning_Text] = useState("");

    


    function addText_to_List(event) {
        let now = new Date()
        let now_temp = now.toLocaleDateString("en-US").split("/")
        let now_format = now_temp[2]+"/"+now_temp[0]+"/"+now_temp[1]
        let date_temp = date.split("-")
        let date_format = date_temp[0]+"/"+date_temp[1]+"/"+date_temp[2]
        let date_save = date_temp[2]+"/"+date_temp[1]+"/"+date_temp[0]


        if(text !== "" && date !== "" && Date.parse(now_format) < Date.parse(date_format)){
            setList([...list, {lp: list.length !== 0 ? list[list.length-1]['lp'] + 1 : 1 ,text, date: date_save, active: "deactivated"}]);
            setDate("");
            setText("");
            setWarning_Date("");
            setWarning_Text("");
        }
        else if(Date.parse(now_format) >= Date.parse(date_format)){
            setWarning_Text("")
            setWarning_Date("UWAGA! Podano zla date");
        }
        else if(text === "" && date !== ""){
            setWarning_Date("")
            setWarning_Text("UWAGA! Nie zawarto tekstu");
        }
        else if(date === "" && text !== ""){
            setWarning_Text("")
            setWarning_Date("UWAGA! Nie zawarto daty");
        }
        else{
            setWarning_Date("UWAGA! Nie zawarto daty");
            setWarning_Text("UWAGA! Nie zawarto tekstu");
        }
    }

    function addDone(){
        if(reload === "reload"){
            setReload("reload again")
        }
        else{
            setReload("reload")
        }
    }


    function deleteEvent(event){
        let update = list.filter(a => a !== event)
        setList(update)
    }


    return(
        <div>
            <form>
                <input 
                    type = "text"
                    value = {text}
                    onChange ={(event) => {setText(event.target.value)}}
                />{warning_text}<br/>
                <input
                    type ="date"
                    value = {date}
                    onChange= {(event) => {setDate(event.target.value)}}
                />{warning_date}<br/>
                <input 
                    type = "button" 
                    onClick = {addText_to_List}
                    value ="Zatwierdz"/>
            </form>
            Lista to-do:
            <ToDo list = {list} deleteEvent = {deleteEvent} addDone = {addDone}/>
        </div>
    )
}




export default Formularz;