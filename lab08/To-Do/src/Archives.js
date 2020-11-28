import React, {Component} from "react";
import {connect} from "react-redux";
import FlipMove from 'react-flip-move';




class Archives extends Component {

    render() {
        return(
            <div className = "listToDo">
                <FlipMove duration={250} easing="ease-out">
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
                </FlipMove>
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

export default connect(mapStateToProps)(Archives);

