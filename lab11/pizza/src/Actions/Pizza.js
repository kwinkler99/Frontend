import React, { Component } from 'react';
import Ingredients from '../Ingredients'
import AddIngredient from '../AddIngredient'
import CreatePizza from './CreatePizza'
import {connect} from "react-redux";
import Pizzas from './Pizzas';
import getIngredients from '../Selectors/selectorIngredients'
import getPizza from '../Selectors/selectorPizza'

class Pizza extends Component {

    render(){
        return (
            <div>
                <AddIngredient 
                    addIngredientsToList = { this.props.addIngredientsToList } />
                <Ingredients 
                    list = { this.props.ingredients }/>
                <CreatePizza />
                <Pizzas />
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        ingredients: getIngredients(state),
        pizza: getPizza(state)
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientsToList: (new_ing) => {
            dispatch({ type: 'ADD_INGREDIENT', new_ing: new_ing });
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Pizza);
