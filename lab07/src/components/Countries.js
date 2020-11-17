import countries from './data';

const Countries = () => {

    return(
        <ul>
            {countries.map(country => (<li key = {country.name}>{country.name}</li>))}
        </ul>
    )
}

export default Countries