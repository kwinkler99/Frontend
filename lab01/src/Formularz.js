import React, {useState} from "react";


const Formularz = () => {
    const [text, setText] = useState("");
    const [list, setList] = useState([]);
    const [date, setDate] = useState(Date(Date.now()));
    const [warning, setWarning] = useState("");
    const months = {
        'Jan' : '01',
        'Feb' : '02',
        'Mar' : '03',
        'Apr' : '04',
        'May' : '05',
        'Jun' : '06',
        'Jul' : '07',
        'Aug' : '08',
        'Sep' : '09',
        'Oct' : '10',
        'Nov' : '11',
        'Dec' : '12'
    }

    


    function addText_to_List(event) {
        let now = Date(Date.now()).split(' ')
        let compare = now[3]+"-"+months[now[1]]+"-"+ now[2]

        if(text !== "" && date !== "" && Date.parse(compare) < Date.parse(date)){
            setList([...list, {text, date}]);
            setDate("");
            setText("");
            setWarning("");
        }
        else if(Date.parse(compare) >= Date.parse(date)){
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