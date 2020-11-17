import React, {Component} from 'react'
import Formularz from './Formularz.js'


const reduce = (state, action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.add_new]
        case 'DELETE':
            return state.filter(element => element.lp !== action.lp)
        case 'EXPIRED':
            return state.map(element => {
                if(element.lp === action.lp){
                    return {
                        ...element,
                        active: 'Expired'
                    }
                }
                return element
                
            })
        case 'DONE':
            return state.map(element => {
                if(element.lp === action.lp){
                    return {
                        ...element,
                        active: 'Done'
                    }
                }
                return element

            })
        case 'FILTER':
            if (action.box !== "All"){
                return (state.filter(function(item) {
                            return(item.active === action.box)
                        }))
            }
            else{
                return state
            }
        case 'START':
            return state
        default:
            //do nothing    
    }
}



class Store extends Component {
    constructor(props){
        super(props)

        this.state = {
            immutableState: reduce([], {type: 'START'}),
            copyState: reduce([], {type: 'START'})
        }

        this.setImmutableState = this.setImmutableState.bind(this)
        this.filter = this.filter.bind(this)
    }

    filter(event) {
        return this.state.copyState.filter(item => item.text.toLowerCase().startsWith(event.toLowerCase()))
    }

    setImmutableState(action){
        
        if(action.type !== 'FILTER'){
            this.setState({
                immutableState: reduce(this.state.copyState, action),
                copyState: reduce(this.state.copyState, action)
            })
        }
        else if(action.type === 'FILTER'){
            this.setState({
                immutableState: reduce(this.filter(action.text), action),
            })
            
        }
    }


    render(){
        return(
            <div>
                <Formularz copyState={this.state.copyState} immutableState={this.state.immutableState} reduce={this.setImmutableState}/>
            </div>
        )
    }


}

export default Store