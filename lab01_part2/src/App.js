import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Kafelek from './kafelek.js'
import './App.css';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2')
    .then(response => {
        setData(response.data
        .map(response_product => {
            const {name, flag} = response_product   
            const product = {
                'name': name,
                'flag': flag,
            }
            return product;
        }))
        return response;
    })
    .catch(error => console.log(error));
},[]);

const mydiv = {
  display: "grid",
  gridTemplateColumns: "auto auto auto",
  padding: "10px",
};



  return (

      <div style={mydiv}>
        {data.map(country => (
          <Kafelek key = {country.name} props = {country}/>
        ))}
      </div>

  );
}

export default App;
