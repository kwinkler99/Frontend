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
  const [currencies, setCurrencies] = useState([])
  const [edit, setEdit] = useState("none")


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2')
    .then(response => {
        setTest(response.data
        .map(response_product => {
            const {name, flag, borders, currencies} = response_product   
            const product = {
                'name': name,
                'flag': flag,
                'borders': borders,
                'currencies': currencies
            }
            return product;
        }))
        setData(response.data
          .map(response_product => {
              const {name, flag, borders, currencies} = response_product   
              const product = {
                  'name': name,
                  'flag': flag,
                  'borders': borders,
                  'currencies': currencies
              }
              return product;
          }))
        setCurrencies(_.union(_.flatten(
          response.data
          .map(current => {
            return current.currencies.map((curr) => curr.name)}))))
            
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
    setEdit("none")
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
    if(border.length > 0){
      setData(data.reduce((acc, current) => {
        const wynik = current.borders.reduce((acc1, current1) => {
          return (current1 === border.toUpperCase() ? [current1] : acc1)
        },[])
        return (wynik.length !== 0 ? [...acc, current] : acc)
      },[]));
    }
  }

  function handleCurr(event){
    setEdit(event.target.value)
    setData(test.filter(a => a.name.toLowerCase().startsWith(text)).reduce((acc, current) => {
      const wynik = current.borders.reduce((acc1, current1) => {
        return (current1 === border.toUpperCase() ? [current1] : acc1)
      },[])
      const wynik1 = current.currencies.reduce((acc1, current1) => {
        return (current1.name === event.target.value ? [current1] : acc1)
      },[])
      if (border.length>0){
        return (wynik1.length !== 0 && wynik.length !== 0 ? [...acc, current] : acc)}
      else{
        return (wynik1.length !== 0? [...acc, current] : acc)}
      },[]))
    
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
          onChange = {(event) => {setText(event.target.value); setData(test)}}
          onClick = {() => {setEdit("none"); setBorder(""); setText(""); setData(test)}}/>
        <input
          type = "button"
          value = "Zatwierdz"
          onClick = {() => handleChange()}/>
        <input
          type = "button"
          value = "Sortuj"
          onClick = {() => handleSort()}/>
        <select value = {edit} onChange = {(event) => handleCurr(event)}>
          <option key = "none" value = "none">none</option>
          {currencies.map(currenc => (
            <option key = {currenc} value={currenc}>{currenc}</option>
          ))}
        </select>
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
