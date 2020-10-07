import React from 'react';


const Kafelek = (props) => {
    
    const myimage = {
        width: "150px",
        margin: "auto",
        padding: "10px"
    }

    const myborder = {
        border: "1px solid",
        padding: "10px",
        margin: "10px"
    }


    return(
        <div key = {props.props.name} style = {myborder}>
            <img style = {myimage} src = {props.props.flag} alt = {props.props.flag}/>
            <div style = {{float: "left"}}>{props.props.name}</div>
        </div>
    )
}


export default Kafelek;