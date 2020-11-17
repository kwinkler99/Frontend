import { useParams } from 'react-router-dom';
import countries from './data';

const CountryDetails = () => {
    let { id } = useParams();

    return(
        <div>
            <h1>{countries[id].name}</h1>
            <div>Kolory flagi: {countries[id].flag.map(colour => (<p key={colour}>{colour}</p>))}</div>
            <p>Stolica: {countries[id].capital}</p>
        </div>
    )


}

export default CountryDetails;
