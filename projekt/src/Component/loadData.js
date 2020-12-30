import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'
import './loadData.css'


class LoadData extends Component {

    componentDidMount(){
        this.props.getData() 
    }

    render() {
        const {data} = this.props.data

        return(
            <div className="view">
                {data.map(item => 
                    <div className="item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div className="text">
                            <p className="brand">{item.brand}</p> 
                            <p className="name">{item.name}</p>
                            <p className="category">Category: {item.category}</p>
                            <p className="price">{"$" + item.price}</p> 
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {getData})(LoadData)
