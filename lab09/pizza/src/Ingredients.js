import React, { Component } from 'react';

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
                {ListItems}
            </ul>
        )
    }

}

export default Ingredients;