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
                    <p className="textDetails">Name: </p>
                    <p>{product.name}</p>
                    <p className="textDetails">Brand: </p>
                    <p>{product.brand}</p>
                    <p className="textDetails">Price: </p>
                    <p>{product.price}</p>
                    <p className="textDetails">Currency: </p>
                    <p>{product.currency}</p>
                    <p className="textDetails">Description: </p>
                    <p>{product.description}</p>
                    <p className="textDetails">Category: </p>
                    <p>{product.category}</p>
                    <p className="textDetails">Type: </p>
                    <p>{product.type}</p>
                    <p className="textDetails">Tags: </p>
                    <p>{product.tag}</p>
                    <p className="textDetails">Colors: </p>
                    {product.colors.map(clr => 
                        <div 
                            key={clr.colour_name} 
                            className="color" 
                            style={{backgroundColor:clr.hex_value}}>
                        </div>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.product,
})

export default connect(mapStateToProps, {})(Details)
