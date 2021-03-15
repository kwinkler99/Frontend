import React, { Component } from 'react';
import FlipMove from 'react-flip-move';

class Ingredients extends Component {
    constructor(props){
        super(props)
        
        this.createList = this.createList.bind(this)
    }

    createList(item) {
        return(
            <li 
                key = {item.id}>
                    {item.name}
            </li>
        )
    }
    
    render(){
        let ListItems = this.props.list.map(this.createList) 

        return (
            <ul>
                <FlipMove duration={250} easing="ease-out"> 
                    {ListItems}
                </FlipMove>
            </ul>
        )
    }

}

export default Ingredients;