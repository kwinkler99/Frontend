import React, { Component } from 'react';
import PizzaItem from './PizzaItem'
import {connect} from "react-redux";
import './Pizzas.css'

class Pizzas extends Component {
    constructor(props){
        super(props)

        this.createList = this.createList.bind(this);
        this.removePizza = this.removePizza.bind(this);
    }

    removePizza(id){    
        this.props.removePizza(id)
    }

    createList(item){
        return(
            <div class="pizzas" key={item.id}>
                <PizzaItem pizza={item}/>
                <input type="button" 
                    onClick={() => this.removePizza(item.id)}
                    value="Usuń pizze"
                    />
            </div>
        )
    }

    render(){
        let pizzaList = this.props.pizza.map(this.createList)
        return (
            <div>
                {pizzaList}
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        pizza: state.pizza
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        removePizza: (id) => {
            dispatch({ type: 'REMOVE_PIZZA', id: id});
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Pizzas);
