import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {sortData} from '../Actions/sortData'
import './filterData.css' 


const select = ["Sortuj od A do Z", "Sortuj od Z do A", "Sortuj przez cenę"]

class FilterData extends Component {
    constructor(props){
        super(props)

        this.state = {
            text: "",
            sort: "Sortuj od A do Z",
            check: [],
            from: 0,
            to: 0
        }

        this.handleText = this.handleText.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleFrom = this.handleFrom.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.handleDone = this.handleDone.bind(this);

    }

    handleText(event){
        this.setState({
            ...this.state,
            text: event
        })
    }

    handleSort(event){
         this.setState({
            ...this.state,
            sort: event
        })
    }

    handleCheck(event){
        function functionCheck(value) {
            return value !== event.value;
        }
        if(event.checked === true){
            this.setState({
                ...this.state,
                check: [...this.state.check, event.value]
            });
        }
        else{
            this.setState({
                ...this.state,
                check: this.state.check.filter(functionCheck)
            });
        }
    }

    handleFrom(event){
        this.setState({
            ...this.state,
            from: event
        })
    }

    handleTo(event){
        this.setState({
            ...this.state,
            to: event
        })
    }

    handleDone(){
        const {text, sort, check, to, from} = this.state
        this.props.sortData(text, sort, check, to, from)
    }

    render() {
        const {category} = this.props.data

        return(
            <div className="filter">
                <form>
                    <input 
                        type="text" 
                        value={this.state.text} 
                        onChange={(ev) => this.handleText(ev.target.value)} 
                        placeholder="wpisz nazwe produktu" /> 
                    <select 
                        onChange={(ev) => this.handleSort(ev.target.value)} 
                        value={this.state.sort}>
                        {select.map(item => 
                            <option 
                                key={item} 
                                value={item}>
                            {item}</option>
                            )}

                    </select><br/>
                    <div>
                        {category
                            .map(item => (
                                <div className="checkbox" key={item}>
                                    <label>{item}</label>
                                    <input 
                                        checked={this.state.check.includes(item)}
                                        type = "checkbox" 
                                        value = {item} 
                                        onChange={(ev) => this.handleCheck(ev.target)}
                                    />
                                </div>
                            )
                        )} 
                    </div>
                    <div className="price">
                        <p>Cena od: </p>
                        <input
                            className="number" 
                            type="number"
                            value={this.state.from}
                            onChange={(ev) => this.handleFrom(ev.target.value)}/>
                    
                        <p>Cena do: </p>
                        <input 
                            className="number" 
                            type="number"
                            value={this.state.to}
                            onChange={(ev) => this.handleTo(ev.target.value)}/><br/>
                    </div>
                    <input
                        className="done"
                        type="button"
                        value="Zatwierdz"
                        onClick={() => this.handleDone()}/>    
                </form>
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {sortData})(FilterData)
