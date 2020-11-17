const Cities = () => {
    const cities = [ { name: 'Warsaw', id: 0 }, { name: 'Tokio', id: 1 }, { name: 'New York', id: 2 } ]
    
    return (
        <ul>
            {cities.map(city => (<li>{city.name}</li>))}
        </ul>
    ) 
}

export default Cities;