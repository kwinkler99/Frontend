import { useParams } from 'react-router-dom';

const CountryDetails = ({countries}) => {
    let { id } = useParams();
    if(countries[id]){
        return(
            <div>
                <h1>{countries[id].name}</h1>
                <div>Kolory flagi: {countries[id].flag.map(colour => (<p key={colour}>{colour}</p>))}</div>
                <p>Stolica: {countries[id].capital}</p>
            </div>
        )
    }
    else{
        return(
            <h1>Nie ma takiego kraju</h1>
        )
    }


}

export default CountryDetails;
