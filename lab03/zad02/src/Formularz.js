import React, {useState} from "react";
import ToDo from './to-do.js'
import Find from './Find.js'
import './Formularz.css'
import Moment from 'moment';


const Formularz = (props) => {

    const [timer, setTimer] = useState("")
    const [text, setText] = useState("");
    const [reload, setReload] = useState("");
    const [date, setDate] = useState("");
    const [warning_date, setWarning_Date] = useState("");
    const [warning_text, setWarning_Text] = useState("");
    const [dateTo, setDateTo] = useState("")
    const [active, setActive] = useState("inactive")
    const [textFilter, setTextFilter] = useState("")
    const [box, setBox] = useState("All")
    const activity = ['Done', 'Todo', 'Expired']
        



    function addText_to_List() {
        let now = new Date()
        let new_date = Moment(date).format('DD.MM.YYYY').split(".")
        let new_test = now.toLocaleDateString().split(".")

        if(text !== "" && date !== ""){
            if(new_date[2]>new_test[2]){
                setActive("active")
            }
            else if(new_date[2] === new_test[2]){
                if(new_date[1]>new_test[1]){
                    setActive("active")
                }
                else if(new_date[1] === new_test[1]){
                    if(new_date[0]>new_test[0]){
                        setActive("active")
                    }
                    else{
                        setWarning_Date("UWAGA! Podano złą datę");
                    }
                }
                else{
                    setWarning_Date("UWAGA! Podano złą datę");
                }
            }
            else{
                setWarning_Date("UWAGA! Podano złą datę");
            }
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
        props.reduce({type: 'DELETE', lp: event.lp})
    }


    function changeActive(change){
        if(dateTo !== ""){
            let date_new = Moment(date).format('DD.MM.YYYY')
            let add = {lp: props.copyState.length !== 0 ? props.copyState[props.copyState.length-1]['lp'] + 1 : 1 ,text, date: date_new, hour: dateTo,  active: "Todo"}
            props.reduce({type: 'ADD', add_new: add})
            setActive(change)
            setBox("All")
            setTextFilter("")
            setDateTo("")
            setDate("");
            setText("");
            setWarning_Date("");
            setWarning_Text("");
        }
        else{
            setActive("active")
        }
    }


    function funDateTo(event){
        setDateTo(event)
    }

    
    function funtextFilter(event){
        props.reduce({type: 'FILTER', box: box, text: event})
        setTextFilter(event)
    }

    function activityFilter(event){
        props.reduce({type: 'FILTER', box: event, text: textFilter})
        setBox(event)
    }

    function funSetTimer(time){
        setTimer(time)
    }

    function changeStatus(status, item){
        props.reduce({type: status, lp: item.lp})
        setBox("All")
    }

    return(
        <div className={"container"}>
            <div className={"menu"}>
                <p>Dodaj wydarzenie</p>
                <form>
                    <div>
                        <input
                            className="box"
                            type = "text"
                            value = {text}
                            placeholder="Wpisz zadanie"
                            onChange ={(event) => {setText(event.target.value)}}
                        />
                        <p>{warning_text}</p>
                    </div>
                    <div>
                        <input
                            type ="date"
                            max="9999-12-30"
                            value = {date}
                            onChange= {(event) => {setDate(event.target.value)}}
                        />
                        <p>{warning_date}</p>
                    </div>
                    <input 
                        className="box1"
                        type = "button" 
                        onClick = {addText_to_List}
                        value ="Zatwierdz"/>
                </form>
                <Find activity={activity} 
                    textFilter={funtextFilter} 
                    text={textFilter} 
                    activityFilter={activityFilter}
                    box={box}/>
            </div>

            <p className="special_text">Lista to-do:</p>
            <ToDo   list = {props.immutableState} 
                    deleteEvent = {deleteEvent} 
                    addDone = {addDone} 
                    active = {active}
                    dateTo = {dateTo}
                    funDateTo = {funDateTo}
                    changeActive = {changeActive}
                    setTimer={funSetTimer}
                    timer={timer}
                    changeStatus={changeStatus}
                    />
        </div>
    )
}




export default Formularz;