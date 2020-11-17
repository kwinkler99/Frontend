import { useParams } from 'react-router-dom';

const CityDetails = () => {

    let { id } = useParams();
    const cities = [ 
        { name: 'Warsaw', id: 0, population: '1,7 milion',  surface: '517,24 km' }, 
        { name: 'Tokio', id: 1, population: '9,2 milion',  surface: '2 194 km'}, 
        { name: 'New York', id: 2 , population: '8,3 milion', surface: '1 213 km'} ]
    if (id < cities.length){
        return (
            <div>
                <h1>{cities[id].name}</h1>
                
                <p>Population: {cities[id].population}</p>
                <p>Surface: {cities[id].surface}</p>
            </div>
        ) 
    }
    else{
        return(
            <h1>Nie ma takich danych</h1>
        )
    }
    
}

export default CityDetails;