import React, { Component }  from 'react';
import {connect} from 'react-redux'
import './details.css'


class Details extends Component {

    render(){
        const {product} = this.props.data

        return (
            <div className="product">
                <img className="imgDetails" src={product.image} alt={product.name} />
                <div className="textAlign">
                    <b>Name: </b>
                    <p className="textDetails">{product.name}</p>
                    <b>Brand: </b>
                    <p className="textDetails">{product.brand}</p>
                    <b>Price: </b>
                    <p className="textDetails">{product.price}</p>
                    <b>Currency: </b>
                    <p className="textDetails">{product.currency}</p>
                    <b>Description: </b>
                    <p className="textDetails">{product.description}</p>
                    <b>Category: </b>
                    <p className="textDetails">{product.category}</p>
                    <b>Type: </b>
                    <p className="textDetails">{product.type}</p>
                    <b>Tags: </b>
                    <p className="textDetails">{product.tag}</p>
                    <b>Colors: </b>
                    <div id="colors">
                        {product.colors.map(clr => 
                            <div 
                                key={clr.colour_name} 
                                className="color" 
                                style={{backgroundColor:clr.hex_value}}>
                            </div>)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.product,
})

export default connect(mapStateToProps, {})(Details)
