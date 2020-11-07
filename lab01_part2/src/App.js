import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Kafelek from './kafelek.js';
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
      return (current1.name === event ? [current1] : acc1)
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
    const filterData = test.filter(a => a.name.toLowerCase().includes(text))
    if(border.length > 0){
      const result = filterData.reduce((acc, current) => {
        return (bor(current).length !== 0 ? [...acc, current] : acc)
      },[])
      handleCurr(result)
    }
    else{
      handleCurr(filterData)
    }
    
  }

  function handleCurr(result){
    setData(result.reduce((acc, current) => {
      if(edit !== "none"){
        return (cur(current, edit).length !== 0? [...acc, current] : acc)
      }
      else{
        return [...acc, current]
      }},[]))

  }

  function Reset(){
    setData(test)
    setSort("nie odwrocone")
    setText("")
    setBorder("")
    setEdit("none")
  }


  return (
    <div>
      <form>
        <input 
          type = "text" 
          value = {border}
          placeholder = "Filtr po sąsiadach"
          onChange = {(event) => {setBorder(event.target.value);}}/>
        <input 
          type = "text"
          value = {text}
          placeholder = "Filtr po nazwie"
          onChange = {(event) => setText(event.target.value)}/>        
        <br/>
        <input
          type = "button"
          value = "Sortuj"
          onClick = {() => handleSort()}/>
        <select value = {edit} onChange = {(event) => {setEdit(event.target.value)}}>
          <option key = "none" value = "none">none</option>
          {currencies.map(currenc => (
            <option key = {currenc} value={currenc}>{currenc}</option>
          ))}
        </select><br/>
        <input
          type = "button"
          value = "Zatwierdz"
          onClick = {() => {handleFiltr()}}/>
        <input 
          type = "button"
          value = "Resetuj dane"
          onClick = {() => Reset()}/>
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
