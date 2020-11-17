const CityDetails = () => {
    const cities = [ 
        { name: 'Warsaw', id: 0, population: '1,7 milion',  surface: '517,24 km' }, 
        { name: 'Tokio', id: 1, population: '9,2 milion',  surface: '2 194 km'}, 
        { name: 'New York', id: 2 , population: '8,3 milion', surface: '1 213 km'} ]
    
    return (
        <div>
            <h1>City name</h1>
            
            <p>Population: 0</p>
            <p>Surface: 0</p>
        </div>
    ) 
}

export default CityDetails;