import { useParams } from 'react-router-dom';
import React, {useState} from "react";


const CountryEdit = ({setCountry, countries}) => {
    let { id } = useParams();
    const [name, setName] = useState(countries[id].name)
    const [flag, setFlag] = useState(countries[id].flag)
    const [capital, setCapital] = useState(countries[id].capital)

    const change = () => {
        setCountry(id, name, flag, capital)
    }


    return(
        <form>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}/><br/>
            <input type="text" value={flag} onChange={(event) => setFlag(event.target.value)}/><br/>
            <input type="text" value={capital} onChange={(event) => setCapital(event.target.value)}/><br/>
            <input type="button" value="Zatwierdz" onClick={() => change()} />
        </form>
    )


}

export default CountryEdit;