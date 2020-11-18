const CountryPanel = ({countries, name}) => {
    let country = countries.filter(a => a.name === name)
    if(country.length !== 0){
        return(
            <div>
                <h1>{country[0].name}</h1>
                <div>Kolory flagi: {country[0].flag.map(colour => (<p key={colour}>{colour}</p>))}</div>
                <p>Stolica: {country[0].capital}</p>
            </div>
        )
    }
    else{
        return(
            <h1>Nie ma takiego kraju</h1>
        )
    }
}

export default CountryPanel