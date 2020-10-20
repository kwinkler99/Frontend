import React, { Component } from 'react'

class NumberList extends Component {
    constructor(props){
        super(props)

        this.createList = this.createList.bind(this);
    }




    createList(item){
        return(<div>
                    <li onClick={this.props.delete(item)} key={item.key}>{item.number}</li>
                    <button onClick={this.props.addOne}>+</button>
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