import React, {Component} from "react";
import './ToDo.css'
import FlipMove from 'react-flip-move';
import SetHour from './SetHour' 




class ToDo extends Component {

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }


    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    tick() {
        this.props.setTimer(new Date())
    }


    check(){
        let time = this.props.timer.toLocaleDateString()
        let new_time = time.split(".")
        this.props.list.map((item) => {
            let new_date = item.date.split(".")
            if(new_date[2]<new_time[2]){          
                item.active = "Expired"
                this.props.handleChange()
                return item
            }
            else if(new_date[2] === new_time[2]){
                if(new_date[1]<new_time[1]){
                    item.active = "Expired"
                    this.props.handleChange()
                    return item
                }
                else if(new_date[1] === new_time[1]){
                    if(new_date[0]<new_time[0]){
                        item.active = "Expired"
                        this.props.handleChange()
                        return item
                    }
                    else if(new_date[0] === new_time[0]){
                        if(item.hour+":00" <= this.props.timer.toLocaleTimeString()){
                            item.active = "Expired"
                            this.props.handleChange()
                            return item
                        }
                        return item
                    }
                    return item
                }
                return item
            }
            return item
        })
    }

    

    render(){
        return(
            <div>
                <FlipMove duration={250} easing="ease-out">
                    {this.props.list
                    .map(choose =>
                        {this.check()
                            if (choose.active === "Todo"){  
                            return(
                                <div className="items" key = {choose.lp}>
                                    <div  key = {choose.lp}>
                                        Lp {choose.lp}. 
                                        Tekst: {choose.text}, 
                                        Data: {choose.date} , 
                                        Godzina: {choose.hour}  </div>
                                    <input 
                                        type = "button" 
                                        onClick = {() => this.props.deleteEvent(choose)}
                                        value ="Przycisk usuń"/>
                                    <input
                                        type = "button" 
                                        onClick = {() => {choose.active = "Done"; this.props.addDone()}}
                                        value ="Przycisk zakończ zadanie"/>
                                </div>
                            )}
                        else if(choose.active === "Done"){
                            return (
                                <div className="items_done" key = {choose.lp}>
                                    Lp {choose.lp}. 
                                    Tekst: {choose.text}, 
                                    Data: {choose.date}, 
                                    Godzina: {choose.hour}</div>)
                        }
                        else{
                            return (
                                <div className="items_expired" key = {choose.lp}>
                                    Lp {choose.lp}. 
                                    Tekst: {choose.text}, 
                                    Data: {choose.date}, 
                                    Godzina: {choose.hour}</div>)
                        }
                    })}
                    
                </FlipMove>
                <SetHour {...this.props}/>
            </div>
        )
    }
}

export default ToDo;