import { Route, BrowserRouter  as Router, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Cities from './components/Cities';
import NotFound from './components/NotFound';
import CityDetails from './components/CityDetails';
import Navbar from './components/Navbar';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';



function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Navbar} />
        <Switch> 
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/cities" component={Cities} />
          <Route path="/cities/:id" component={CityDetails} />
          <Route exact path="/countries" component={Countries} />
          <Route path="/countries/:id" component={CountryDetails} />

          <Route component={NotFound} />
        </Switch>
      </Router>    
    </div>
  );
}

export default App;
