import CountryPanel from './CountryPanel'

const Countries = ({countries, params}) => {
    const name = params.get('countryName')
    if(name){
        return(<CountryPanel countries={countries} name={name}/>)
    }
    else{
        return(
            <ul>
                {countries.map(country => (<li key = {country.name}>{country.name}</li>))}
            </ul>
        )
    }
}

export default Countries