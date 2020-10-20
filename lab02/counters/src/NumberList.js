import React, { Component } from 'react'
import './NumberList.css'
import FlipMove from 'react-flip-move';


class NumberList extends Component {
    constructor(props){
        super(props)


        this.createList = this.createList.bind(this);
        this.delete = this.delete.bind(this);
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
        this.addNumber = this.addNumber.bind(this)
    }

    increase(key){
        this.props.increase(key)
    }

    decrease(key){
        this.props.decrease(key)
    }

    delete(key){
        this.props.delete(key)
    }


    addNumber(key, num){
        this.props.addNumber(num, key)
        this._inputNumber.value = ""
    }





    createList(item){
        return(<div className = "List">
                <FlipMove duration={250} easing="ease-out">
                    <li key={item.key}>{item.number}
                        <div>
                            <input type="button" value="+"
                            onClick={() => this.increase(item.key)}/>
                            <input type="button" value="-" 
                            onClick={() => this.decrease(item.key)}/>
                            <input className="text" typ="text" ref={(a) => this._inputNumber = a}
                                    placeholder="Wpisz liczbe"/>
                            <input type="button" value="Dodaj"
                                onClick={() => this.addNumber(item.key, this._inputNumber)}/>
                            <input type="button" value="Usuń"
                                onClick={() => this.delete(item.key)}/>
                        </div> 
                    </li>
                </FlipMove>          

                    
                    
              </div>)
    }



    render(){

        let listItems = this.props.list
        let toDoListItems = listItems.map(this.createList) 

        return(
            <ul>
                {toDoListItems}
            </ul>
        )
    }


}


export default NumberList;