import React, { Component } from 'react'

class NumberList extends Component {
    constructor(props){
        super(props)

        this.createList = this.createList.bind(this);
        this.delete = this.delete.bind(this);
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
    }

    increase(key){
        this.props.increase(key)
    }

    decrease(key){
        this.props.decrease(key)
    }

    delete(key){
        this.props.delete(key)
    }


    createList(item){
        return(<div>
                    <li onClick={() => this.delete(item.key)} key={item.key}>{item.number}</li>
                    <div>
                        <input type="button" value="+"
                        onClick={() => this.increase(item.key)}/>
                        <input type="button" value="-" 
                        onClick={() => this.decrease(item.key)}/>
                    </div>            
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