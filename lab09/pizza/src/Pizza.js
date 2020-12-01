import React, { Component } from 'react';



class Pizza extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            text: ""
        }
    }

    

    render(){
        return (
            <form>
                <p>Wprowadz skladnik</p>
                <input type="text" value={this.state.text} onChange={(event) => this.setState({text: event.target.valu})}/>
                <input type="button" value="zatwierdz" />
            </form>
        )
    }

}

export default Pizza;