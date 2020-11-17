/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import NumberList from './NumberList.js'


class Count extends Component {
    constructor(props){
        super(props)

        this.addToList = this.addToList.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.addNumber = this.addNumber.bind(this)
        this.changeText = this.changeText.bind(this)
    }

    addToList(event){
        let arr = this.props.immutableState
        let temp_obj={
            number: 0, 
            key: arr[arr.length - 1] ? (arr[arr.length - 1].key + 1) : 0,
            text: ""
        }

        event.preventDefault();
        this.props.setImmutableState({type: 'addNew', new_item: temp_obj})
    }

    deleteItem(key){
        this.props.setImmutableState({type: 'DELETE', key: key})
    }

    increment(key){
        this.props.setImmutableState({type: 'INCREMENT', key: key})
    }

    decrement(key){
        this.props.setImmutableState({type: 'DECREMENT', key: key})
    }


    addNumber(key){
        let reduce = this.props.setImmutableState
        this.props.immutableState.map(function(item) {
            if(item.key === key && item.text !== "" && !isNaN(parseInt(item.text))){
                reduce({type: 'addNumber', key: key, number: parseInt(item.text)})
                item.number += parseInt(item.text) 
                item.text = ""                
            }          
            return item
        })
    }




    changeText(txt, key){
        this.props.setImmutableState({type: 'TEXT', key: key, txt: txt})
    }


    render(){
        return(
            <div>
                <div className="counter">
                    <p>Counter:</p>
                    <form onSubmit={this.addToList}>
                        <button type="submit">Dodaj licznik</button> 
                    </form>
                </div>
                <NumberList increment={this.increment} addNumber={this.addNumber} 
                            decrement={this.decrement} delete={this.deleteItem} 
                            list={this.props.immutableState} changeText={this.changeText}/>
            </div>
        )


    }
}

export default Count