import { Route, BrowserRouter  as Router, Switch, browserHistory } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Cities from './components/Cities';
import NotFound from './components/NotFound';
import CityDetails from './components/CityDetails';
import Navbar from './components/Navbar';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';
import CountryEdit from './components/CountryEdit';

function App({data, change}) {
  
  return (
    <div>
      <Router>
        <Route path="/" component={Navbar} />
        <Switch> 
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/cities" component={Cities} />
          <Route path="/cities/:id" component={CityDetails} />
          <Route exact path="/countries" component={() => <Countries countries={data} params={new URLSearchParams(window.location.search)} />} />
          <Route path="/countries/:id/edit" component={() => <CountryEdit setCountry={change} countries={data} />} />
          <Route path="/countries/:id" component={() => <CountryDetails countries={data} />} />
          <Route component={NotFound} />
        </Switch>
      </Router>    
    </div>
  );
}

export default App;
