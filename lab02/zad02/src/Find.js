import React, { Component} from 'react'
import './Find.css'


class Find extends Component {
    constructor(props){
        super(props)

        this.createList = this.createList.bind(this);
    }


    createList(item){
        return(<option key={item} value={item}>{item}</option>)
    }


    render() {

        let List = this.props.activity.map(this.createList)

        return (
            <div className="search">
                <p>Przeszukaj mnie:</p>
                <form>
                    <input 
                        type="text"
                        value={this.props.text}
                        placeholder="Wpisz szukana fraze"
                        onChange={(event) => this.props.textFilter(event.target.value)}/>
                    <select value={this.props.box} 
                            onChange={(event) => this.props.activityFilter(event.target.value)}>
                        <option key = "All" value = "All">All</option>
                        {List}
                    </select>
                </form>
            </div>
        )
    }


}


export default Find;