import React, {Component} from 'react'
import Formularz from './Formularz.js'
import { createStore } from 'redux'
import reduce from './reducer'


const store = createStore(reduce)

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
                <Formularz 
                    copyState = { store.getState().copyState } 
                    immutableState = { store.getState().immutableState } 
                    add = {() => store.dispatch({ type: 'ADD' })}
                    delete = {() => store.dispatch({type: 'DELETE' })}
                    expired = {() => store.dispatch({ type: 'EXPIRED' })}
                    done = {() => store.dispatch({ type: 'DONE' })}
                    filter = {() => store.dispatch({ type: 'FILTER' })}
                    reduce = { this.setImmutableState }/>
            </div>
        )
    }


}

export default Store