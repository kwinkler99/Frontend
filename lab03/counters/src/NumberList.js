import React, { Component } from 'react'
import './NumberList.css'
import FlipMove from 'react-flip-move';


class NumberList extends Component {
    constructor(props){
        super(props)


        this.createList = this.createList.bind(this);
        this.delete = this.delete.bind(this);
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.addNumber = this.addNumber.bind(this)
        this.changeText = this.changeText.bind(this)
        this.stop = this.stop.bind(this)
    }

    increment(key){
        this.props.increment(key)
    }

    decrement(key, active){
        this.props.decrement(key, active)
    }

    delete(key){
        this.props.delete(key)
    }


    addNumber(key){
        this.props.addNumber(key)
    }

    changeText(value, key){
        this.props.changeText(value, key)
        this._inputElement = ""
    }

    stop(key){
        this.props.stop(key)
    }



    createList(item){
        return(
            <div key={item.key} className = "List">
                <li key={item.key}>{item.number}</li>
                <input type="button" value="+"
                       onClick={() => this.increment(item.key)}/>
                <input type="button" value="-" 
                       onClick={() => this.decrement(item.key, item.active)}/>
                <input className="text" typ="text" 
                       value = {item.text}
                       onChange={(e) => this.changeText(e.target.value, item.key)}
                       placeholder="Wpisz liczbe"/>
                <input type="button" value="Dodaj"
                       onClick={() => this.addNumber(item.key)}/>
                <input type="button" value="Usuń"
                       onClick={() => this.delete(item.key)}/>
                <input type="button" value="Stop" onClick={() => this.stop(item.key)}/>
            </div> 
                
        )
    }



    render(){
        let listItems = this.props.list
        let toDoListItems = listItems.map(this.createList) 

        return(
            <ul>
                <FlipMove duration={250} easing="ease-out">
                    {toDoListItems}
                </FlipMove>          
            </ul>
        )
    }


}


export default NumberList;