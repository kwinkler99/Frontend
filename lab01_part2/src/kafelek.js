import React, { Component } from 'react';
import './kafelek.css';


class Kafelek extends Component{
    
    render() {
        return(
            <div id="border" key={this.props.name}>
                <img id="img" src={this.props.flag} alt={this.props.flag}/>
                <div style = {{float: "left-bottom"}}>{this.props.name}</div>
            </div>
        )
    }
}


export default Kafelek;