/* eslint-disable no-useless-constructor */
import React, { Component } from 'react'
import NumberList from './NumberList.js'


class Count extends Component {
    constructor(props){
        super(props)

        this.state = {
            items: [
                {number: 0, key:0}
            ],
        }

        this.addOne = this.addOne.bind(this)
        this.addOne = this.removeOne.bind(this)
        this.addToList = this.addToList.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    addToList(event){
        let numberArray = this.state.items
        numberArray.push({     
            key: this.state.key + 1,                  
            number: 0, 
        })
        this.setState({
            items: numberArray
        })

        event.preventDefault();
    }

    addOne(){
        //dodawanie
    }

    removeOne(){
        //odejmowanie
    }

    deleteItem(item){
        console.log(item)
        // let numberArray = this.state.items.filter(function(e){
        //     return(e.key !== item.key)
        // })
        // this.setState({
        //     items: numberArray
        // })
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
                <NumberList delete={this.deleteItem} list={this.state.items} addOne={this.addOne} removeOne={this.removeOne}/>
            </div>
        )


    }
}

export default Count