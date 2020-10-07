import React from "react";


const ToDo = (props) => {
    return(
        <div>
            {props.list
            .map(choose =>
                {if (choose.active === "deactivated"){  
                    return(
                        <div key = {choose.lp}>
                            <div style={{display: "inline"}} key = {choose.lp}>Lp {choose.lp}. Tekst: {choose.text}, Data: {choose.date}  </div>
                            <input 
                                type = "button" 
                                onClick = {() => props.deleteEvent(choose)}
                                value ="Przycisk usuń"/>
                            <input
                                type = "button" 
                                onClick = {() => {choose.active = "activated"; props.addDone()}}
                                value ="Przycisk zakończ zadanie"/>
                        </div>)}
                else{
                    return (
                        <div style={{background: "green"}} key = {choose.lp}>Lp {choose.lp}. Tekst: {choose.text}, Data: {choose.date}</div>)
                }    
            })}
        </div>
    )
}

export default ToDo;