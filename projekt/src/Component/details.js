import React, { Component }  from 'react';
import {connect} from 'react-redux'
import './details.css'


class Details extends Component {

    render(){
        const {product} = this.props.data
        return (
            <div className="product">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
                <p>{product.brand}</p>
                <p>{product.price}</p>
                <p>{product.currency}</p>
                <p>{product.description}</p>
                <p>{product.category}</p>
                <p>{product.type}</p>
                <p>{product.tag}</p>
                {product.colors.map(clr => <div key={clr.hex_value} className="color" style={{backgroundColor:clr.hex_value}}></div>)}
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.product,
})

export default connect(mapStateToProps, {})(Details)
