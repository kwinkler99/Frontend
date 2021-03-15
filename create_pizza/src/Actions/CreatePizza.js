import React, { Component } from 'react';
import '../CreatePizza.css'
import {connect} from "react-redux";

const dough = ["Ciasto cienkie", "Na grubym cieście", "Ciasto makaronowe", "Ciasto tradycyjne"]

class CreatePizza extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            dough: "Ciasto cienkie"
        }
        this.submitIngredients = this.submitIngredients.bind(this)
        this.createCheckbox = this.createCheckbox.bind(this)
        this.createSelect = this.createSelect.bind(this)

    }


    submitIngredients(){
        let all_ingredients = this.props.ingredients.filter(a => a.check === true)
        this.props.addIngredientsToPizza({'ingredients': all_ingredients, 'dough': this.state.dough})
        this.setState({
            dough: "Ciasto cienkie"
        })
    }

    createCheckbox(item){
        return(
            <div key={item.id}>
                <input 
                    type="checkbox" 
                    checked={item.check}
                    onChange={() => {this.setState({dough: this.state.dough}); item.check = !item.check}} 
                    value={item.name} />
                <label class="container">{item.name}</label>
            </div>
        )
    }

    createSelect(item){
        return(
            <option 
                key={item} 
                value={item}>
                    {item}
            </option>
        )
    }


    render(){
        let checkboxList = this.props.ingredients.map(this.createCheckbox) 
        let selectList = dough.map(this.createSelect)
        return (
            <div>
                <form class="createPizza">
                    <p>Zaznacz które składniki chcesz dodać do pizzy:</p>
                    <div class="onLeft">
                        {checkboxList}
                    </div>
                    <p>Wybierz ciasto:</p>
                    <div class="onLeft">
                        <select 
                            value={this.state.dough} 
                            onChange={(event) => this.setState({
                                dough: event.target.value
                            })} 
                            name="dough" 
                            id="dough">
                                {selectList}
                        </select><br/>
                    </div>
                    <input 
                        class="button"
                        type="button" 
                        onClick={() => this.submitIngredients()} 
                        value="Zatwierdź" />
                </form>
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
        addIngredientsToPizza: (new_pizza) => {
            dispatch({ type: 'ADD_INGREDIENT_TO_PIZZA', new_pizza: new_pizza })
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreatePizza);



