import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Kafelek from './kafelek.js'
import './App.css';

function App() {
  const [data, setData] = useState([])
  const [text, setText] = useState("")
  const [test, setTest] = useState(data)
  const [sort, setSort] = useState("nie odwrocone")
  const sortBy = (key) => {
    return (a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0);
};


  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2')
    .then(response => {
        setTest(response.data
        .map(response_product => {
            const {name, flag} = response_product   
            const product = {
                'name': name,
                'flag': flag,
            }
            return product;
        }))
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

  function handleChange(){
    setData(test.filter(a => a.name.toLowerCase().startsWith(text)))
    setSort("nie odwrocone")
  }

  function handleSort(){
    if(sort === "nie odwrocone"){
      setData(data.concat().sort(sortBy(['name'])))
      setSort("odwrocone")
    }
    else{
      setData(data.reverse())
      setSort("nie odwrocone")
    }
  }



  return (
    <div>
      <form>
        <input 
          type = "text"
          value = {text}
          onChange = {(event) => {setText(event.target.value); setData(test)}}
          />
        <input
          type = "button"
          value = "Zatwierdz"
          onClick = {() => handleChange()}
          />
        <input
          type = "button"
          value = "Sortuj"
          onClick = {() => handleSort()}
          />
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
