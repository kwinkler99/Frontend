import React, { Component } from 'react';
import './PizzaItem.css'

class PizzaItem extends Component {  
    constructor(props){
        super(props)

        this.createList = this.createList.bind(this);
    }  

    createList(item){
        return(
            <li key={item.name}>{item.name}</li>
        )
    }

    render(){
        const list = this.props.pizza.details.ingredients.map(this.createList)
        return (
            <div class='pizzaItem'>
                <p>Pizza nr {this.props.pizza.id}, ciasto: {this.props.pizza.details.dough}</p>
                <ul>
                    {list}
                </ul>
                
            </div>
        )
    }

}

export default PizzaItem