import React, { Component }  from 'react';
import LoadData from './Component/loadData'
import FilterData from './Component/filterData'


class Main extends Component {

    render(){

        return (
            <div className="App">
                <FilterData />
                <LoadData />
            </div>
        );
    }
}


export default Main