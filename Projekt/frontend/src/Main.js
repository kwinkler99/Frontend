import React, { Component }  from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './Home';
import Form from './Component/form.js'
import Details from './Component/details.js'
import NotFound from './Component/notFound.js';



class Main extends Component {

    render(){

        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={({history}) => <Home history={history}/>} />
                        <Route path="/product" component={({history}) => <Details history={history}/>} />
                        <Route path="/form" component={({history}) => <Form history={history}/>} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}


export default Main