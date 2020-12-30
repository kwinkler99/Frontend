import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'


class FilterData extends Component {
    constructor(props){
        super(props)

        this.state = {
            text: "",
            sort: ""

        }
    }

    render() {

        return(
            <div className="filter">
                <form>
                    <input type="text" value={this.state.text} placeholder="wpisz nazwe produktu" /> 
                </form>
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {getData})(FilterData)


// select z wyborem przez co sortowac(cena, alfabetycznie, odwrotnie do alfabetycznego)
// wyszukiwanie po nazwie
// checkbox z kategoriami 
