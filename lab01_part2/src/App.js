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

  function save (res_prod) {
    const {name, flag, borders, currencies} = res_prod
    const product = {
        'name': name,
        'flag': flag,
        'borders': borders,
        'currencies': currencies
    }
    return product;
  }


  function bor(curr){
    const result = curr.borders.reduce((acc, current) => {
      return (current === border.toUpperCase() ? [current] : acc)
    },[])
    return result
  }

  function cur(curr, event){
    const result = curr.currencies.reduce((acc1, current1) => {
      return (current1.name === event.target.value ? [current1] : acc1)
    },[])
    return result
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2')
    .then(response => {

        setTest(response.data
        .map(response_product => {
            return save(response_product)
        }))

        setData(response.data
          .map(response_product => {
            return save(response_product)
          }))

        setCurrencies(_.union(_.flatten(
          response.data
          .map(current => {
            return current.currencies.map((curr) => curr.name)}))))
        
        return response;
    })
    .catch(error => console.log(error));
  },[]);

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
        return (bor(current).length !== 0 ? [...acc, current] : acc)
      },[]));
    }
  }

  function handleCurr(event){
    setEdit(event.target.value)
    setData(test.filter(a => a.name.toLowerCase().startsWith(text)).reduce((acc, current) => {
      if (border.length>0){
        return (cur(current, event).length !== 0 && bor(current).length !== 0 ? [...acc, current] : acc)}
      else{
        return (cur(current, event).length !== 0? [...acc, current] : acc)}
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
      <div id="myDiv">
        {data.map(country => (
          <Kafelek key = {country.name} {...country}/>
        ))}
      </div>
    </div>
  );
}

export default App;
