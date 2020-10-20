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
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
    }

    addToList(event){
        let arr = this.state.items
        arr.push({  
            number: 0, 
            key: arr[arr.length - 1] ? (arr[arr.length - 1].key + 1) : 0,                  
        })
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
    }

    increase(key){
        let increaseArray = this.state.items
        let changeArray = increaseArray.map(function(item){
            if(item.key === key){
                    item.number += 1
            }
            return item 
        })

        this.setState({
            items: changeArray
        })

    }

    decrease(key){
        let decreaseArray = this.state.items
        let changeArray = decreaseArray.map(function(item){
            if(item.key === key){
                    item.number -= 1
            }
            return item 
        })

        this.setState({
            items: changeArray
        })




    }

    render(){
        return(
            <div>
                <div>
                    <p>Counter:</p>
                    <form onSubmit={this.addToList}>
                        {/* <input typ="text" ref={(a) => this._inputNumber = a}
                            placeholder="Wpisz liczbe">   
                        </input> */}
                        <button type="submit">Dodaj licznik</button> 
                    </form>
                </div>
                <NumberList increase={this.increase} decrease={this.decrease} delete={this.deleteItem} list={this.state.items}/>
            </div>
        )


    }
}

export default Count