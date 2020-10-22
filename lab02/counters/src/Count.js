/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import NumberList from './NumberList.js'


class Count extends Component {
    constructor(props){
        super(props)

        this.state = {
            items: []
        }

        this.addToList = this.addToList.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.addNumber = this.addNumber.bind(this)
        this.changeText = this.changeText.bind(this)
    }

    addToList(event){
        let arr = this.state.items
        let temp_obj={
            number: 0, 
            key: arr[arr.length - 1] ? (arr[arr.length - 1].key + 1) : 0,
            text: ""
        }
        this.props.reduce(this.state.items, {type: 'addNew', new_item: temp_obj})
        
        arr.push(temp_obj)    
        this.setState({
            items: arr
        })

        event.preventDefault();
    }

    deleteItem(key){
        let filterArray = this.state.items.filter(function(item){
            return(item.key !== key)
        })
        this.setState({
            items: filterArray
        })

        this.props.reduce(this.state.items, {type: 'DELETE', key: key})
    }

    increment(key){
        this.props.reduce(this.state.items, {type: 'INCREMENT', key: key})

        let incrementArray = this.state.items
        let changeArray = incrementArray.map(function(item){
            if(item.key === key){
                    item.number += 1
            }
            return item 
        })
        this.setState({
            items: changeArray
        })

    }

    decrement(key){
        this.props.reduce(this.state.items, {type: 'DECREMENT', key: key})
        
        let decrementArray = this.state.items
        let changeArray = decrementArray.map(function(item){
            if(item.key === key){
                    item.number -= 1
            }
            return item 
        })
        this.setState({
            items: changeArray
        })

    }


    addNumber(key){
        let reduce = this.props.reduce
        let items = this.state.items
        let changeArray = this.state.items
        let newArray = changeArray.map(function(item) {
            if(item.key === key && item.text !== "" && !isNaN(parseInt(item.text))){
                reduce(items, {type: 'addNumber', key: key, number: parseInt(item.text)})
                item.number += parseInt(item.text) 
                item.text = ""                
            }          
            return item
        })


        this.setState({
            items: newArray
        })
    }




    changeText(txt, key){
        let txtArray = this.state.items
        let newArray = txtArray.map(function(item) {
            if(item.key === key){
                item.text = txt                 
            }          
            return item
        })
        this.setState({
            items: newArray
        })
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
                            list={this.state.items} changeText={this.changeText}/>
            </div>
        )


    }
}

export default Count