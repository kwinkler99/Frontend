import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Kafelek from './kafelek.js'
import './App.css';
const _ = require('lodash');


function App() {
  const [data, setData] = useState([])
  const [text, setText] = useState("")
  const [test, setTest] = useState(data)
  const [sort, setSort] = useState("nie odwrocone")
  const [border, setBorder] = useState("") 


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2')
    .then(response => {
        setTest(response.data
        .map(response_product => {
            const {name, flag, borders} = response_product   
            const product = {
                'name': name,
                'flag': flag,
                'borders': borders
            }
            return product;
        }))
        setData(response.data
          .map(response_product => {
              const {name, flag, borders} = response_product   
              const product = {
                  'name': name,
                  'flag': flag,
                  'borders': borders
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

  function handleChange(){
    setData(test.filter(a => a.name.toLowerCase().startsWith(text)))
    setSort("nie odwrocone")
  }

  function handleSort(){
    if(sort === "nie odwrocone"){
      setData(_.sortBy(data, ['name']))
      setSort("odwrocone")
    }
    else{
      setData(data.reverse())
      setSort("nie odwrocone")
    }
  }

  function handleFiltr(){
    setData(data.reduce((acc, current) => {
      const wynik = current.borders.reduce((acc1, current1) => {
        return (current1 === border.toUpperCase() ? [current1] : acc1)
      },[])
      return (wynik.length !== 0 ? [...acc, current] : acc)
    },[]));
  }



  return (
    <div>
      <form>
        <input 
          type = "text" 
          value = {border}
          onChange = {(event) => {setBorder(event.target.value); handleChange()}}/>
        <input 
          type = "button"
          value = "Zatwierdz Filtr"
          onClick = {() => handleFiltr()}/>
        <input 
          type = "text"
          value = {text}
          onChange = {(event) => {setText(event.target.value); setData(test)}}/>
        <input
          type = "button"
          value = "Zatwierdz"
          onClick = {() => handleChange()}/>
        <input
          type = "button"
          value = "Sortuj"
          onClick = {() => handleSort()}/>
      </form>
      <div style={mydiv}>
        {data.map(country => (
          <Kafelek key = {country.name} props = {country}/>
        ))}
      </div>
    </div>
  );
}

export default App;
