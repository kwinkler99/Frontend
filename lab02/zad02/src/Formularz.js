import React, {useState} from "react";
import ToDo from './to-do.js'
import Find from './Find.js'
import './Formularz.css'
import Moment from 'moment';


const Formularz = () => {

    const [timer, setTimer] = useState("")
    const [text, setText] = useState("");
    const [list, setList] = useState([]);
    const [reload, setReload] = useState("");
    const [date, setDate] = useState("");
    const [warning_date, setWarning_Date] = useState("");
    const [warning_text, setWarning_Text] = useState("");
    const [dateTo, setDateTo] = useState("")
    const [active, setActive] = useState("inactive")
    const [textFilter, setTextFilter] = useState("")
    const [copyList, setCopyList] = useState([])
    const [box, setBox] = useState("All")
    const activity = ['Done', 'Todo', 'Expired']
    function filter(event) {return copyList.filter(item => item.text.toLowerCase().startsWith(event.toLowerCase()))}
        



    function addText_to_List(event) {
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
        setCopyList(list)
    }


    function deleteEvent(event){
        let update = list.filter(a => a !== event)
        setList(update)
        setCopyList(update)
    }


    function changeActive(change){
        if(dateTo !== ""){
            let date_new = Moment(date).format('DD.MM.YYYY')
            setActive(change)
            setList([...list, {lp: list.length !== 0 ? list[list.length-1]['lp'] + 1 : 1 ,text, date: date_new, hour: dateTo,  active: "Todo"}]);
            setCopyList([...list, {lp: list.length !== 0 ? list[list.length-1]['lp'] + 1 : 1 ,text, date: date_new, hour: dateTo,  active: "Todo"}])
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
        if (box !== "All"){
            setList(filter(event).filter(function(item) {
                return(item.active === box)
            }))
        }
        else{
            setList(filter(event))

        }
        setTextFilter(event)
    }

    function activityFilter(event){
        if (event !== "All"){
            setList(filter(textFilter).filter(function(item) {
                return(item.active === event)
            }))
        }
        else{
            setList(filter(textFilter))

        }
        setBox(event)
    }

    function handleChange(){
        setCopyList(list)
    }

    function funSetTimer(time){
        setTimer(time)
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
            <ToDo   list = {list} 
                    deleteEvent = {deleteEvent} 
                    addDone = {addDone} 
                    active = {active}
                    dateTo = {dateTo}
                    funDateTo = {funDateTo}
                    changeActive = {changeActive}
                    handleChange={handleChange}
                    setTimer={funSetTimer}
                    timer={timer}
                    />
        </div>
    )
}




export default Formularz;