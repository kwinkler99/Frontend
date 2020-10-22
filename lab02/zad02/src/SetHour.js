import React, { Component} from 'react'
import './SetHour.css'


class SetHour extends Component {


    itemDate(){
        if(this.props.active === "inactive"){
            return(
            <div></div>
            )
        }
        else{
            return(
                <div>
                    <p>Wybierz godzine: </p>      
                    <input
                        type ="time"
                        value = {this.props.dateTo}
                        onChange= {(event) => this.props.funDateTo(event.target.value)}
                    />
                    <input 
                        type = "button" 
                        onClick = {() => this.props.changeActive("inactive")}
                        value ="Zatwierdz"/>
                </div>
            )
        }
    }
    
    
    render(){
        return(
            <div className={this.props.active}>
                {this.itemDate()}
            </div>
        )
    }

}

export default SetHour;