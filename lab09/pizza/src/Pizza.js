import React, { Component } from 'react';
import Ingredients from './Ingredients'
import AddIngredient from './AddIngredient'
import {connect} from "react-redux";

class Pizza extends Component {

    render(){
        return (
            <div>
                <AddIngredient addIngredientsToList = { this.props.addIngredientsToList } />
                <Ingredients list = { this.props.ingredients }/>
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
        addIngredientsToList: (new_ing) => {
            dispatch({ type: 'ADD_INGREDIENT', new_ing: new_ing });
        },
        addIngredientsToPizza: (ing) => {
            dispatch({ type: 'ADD_INGREDIENT_TO_PIZZA', ing: ing })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Pizza);
