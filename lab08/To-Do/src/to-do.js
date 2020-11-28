import React, {Component} from "react";
import './ToDo.css'
import FlipMove from 'react-flip-move';
import SetHour from './SetHour' 
import Archives from './Archives'
import {connect} from "react-redux";




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
        this.props.value.list.map((item) => {
            let new_date = item.date.split(".")
            if(new_date[2]<new_time[2]){
                this.props.deleteItem(item.lp)  
                this.props.expired(item)        
                return item
            }
            else if(new_date[2] === new_time[2]){
                if(new_date[1]<new_time[1]){
                    this.props.deleteItem(item.lp)
                    this.props.expired(item)
                    return item
                }
                else if(new_date[1] === new_time[1]){
                    if(new_date[0]<new_time[0]){
                        this.props.deleteItem(item.lp)
                        this.props.expired(item)
                        return item
                    }
                    else if(new_date[0] === new_time[0]){
                        if(item.hour+":00" <= this.props.timer.toLocaleTimeString()){
                            this.props.deleteItem(item.lp)
                            this.props.expired(item)
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
            <div className = "listToDo">
                <FlipMove duration={250} easing="ease-out">
                    {this.props.value.list
                        .map(choose =>
                            {this.check()
                                return(
                                    <div className="items" key = {choose.lp}>
                                        <div  key = {choose.lp}>
                                            Lp {choose.lp}. 
                                            Tekst: {choose.text}, 
                                            Data: {choose.date} , 
                                            Godzina: {choose.hour}, 
                                            Status: {choose.active}</div>
                                        <input 
                                            type = "button" 
                                            onClick = {() => this.props.deleteItem(choose.lp)}
                                            value ="Przycisk usuń"/>
                                        <input
                                            type = "button" 
                                            onClick = {() => {this.props.deleteItem(choose.lp); this.props.add_to_archives_done(choose)}}
                                            value ="Przycisk zakończ zadanie"/>
                                    </div>
                                )

                        })
                    }
                    <p className="special_text">Archiwum: </p>
                    
                </FlipMove>
                <Archives />
                <SetHour {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        value: state.reduce,
        archives: state.archives
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_to_archives_done: (arch) => {
            dispatch({ type: 'ADD_TO_ARCHIVES_DONE', new_arch: arch })
        },
        add_to_archives_expired: (arch) => {
            dispatch({ type: 'ADD_TO_ARCHIVES_EXPIRED', new_arch: arch })
        },
        deleteItem: (lp) => {
            dispatch({type: 'DELETE', lp: lp })
        },
        expired: (lp) => {
            dispatch({ type: 'EXPIRED', lp: lp })
        },
        done: (lp) => {
            dispatch({ type: 'DONE', lp: lp })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
