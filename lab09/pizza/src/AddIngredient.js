import React, { Component } from 'react';

class AddIngredient extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            text: ""
        }
        this.addIngredient = this.addIngredient.bind(this)
    }


    addIngredient(new_ing){
        this.props.addIngredientsToList(new_ing)
        this.setState({
            text: ""
        })
    }


    render(){
        return (
            <form>
                <p>Wprowadz skladnik</p>
                <input type="text" value={this.state.text} onChange={(event) => this.setState({text: event.target.value})}/>
                <input type="button" onClick={() => this.addIngredient(this.state.text)} value="zatwierdz" />
            </form>
        )
    }

}


export default AddIngredient;
