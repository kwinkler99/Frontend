import React, {Component} from "react";


class Archives extends Component {

    render() {
        return(
            <div className = "listToDo">
                {this.props.archives
                    .map(choose => {
                        if(choose.active === "Done"){
                            return (
                                <div className="items_done" key = {choose.lp}>
                                    Lp {choose.lp}. 
                                    Tekst: {choose.text}, 
                                    Data: {choose.date}, 
                                    Godzina: {choose.hour}, 
                                    Status: {choose.active}</div>)
                        }
                        else{
                            return (
                                <div className="items_expired" key = {choose.lp}>
                                    Lp {choose.lp}. 
                                    Tekst: {choose.text}, 
                                    Data: {choose.date}, 
                                    Godzina: {choose.hour}, 
                                    Status: {choose.active}</div>)
                        }
                    })}
            </div>
        )            
    }

}


export default Archives
