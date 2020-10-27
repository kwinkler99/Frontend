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
        let arr = this.props.value
        let temp_obj={
            number: 0, 
            key: arr[arr.length - 1] ? (arr[arr.length - 1].key + 1) : 0,
            text: ""
        }

        event.preventDefault();
        this.props.addNew(temp_obj)
    }

    deleteItem(key){
        this.props.delete(key)
    }

    increment(key){
        this.props.increment(key)
    }

    decrement(key){
        this.props.decrement(key)
    }


    addNumber(key){
        let reduce = this.props.addNumber
        this.props.value.map(function(item) {
            if(item.key === key && item.text !== "" && !isNaN(parseInt(item.text))){
                reduce(key, parseInt(item.text))
                item.number += parseInt(item.text) 
                item.text = ""                
            }          
            return item
        })
    }




    changeText(txt, key){
        this.props.text(key, txt)
    }


    render(){
        return(
            <div>
                <div className="counter">
                    {console.log(this.props.value)}
                    <p>Counter:</p>
                    <form onSubmit={this.addToList}>
                        <button type="submit">Dodaj licznik</button> 
                    </form>
                </div>
                <NumberList increment={this.increment} addNumber={this.addNumber} 
                            decrement={this.decrement} delete={this.deleteItem} 
                            list={this.props.value} changeText={this.changeText}/>
            </div>
        )


    }
}

export default Count