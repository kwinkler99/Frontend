import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {editDone} from '../Actions/editDoneProduct'
import {getProduct} from '../Actions/getProduct'

import './details.css'


class Details extends Component {
    constructor(props){
        super(props)

        this.state = {
            edit: false,
            item: {}
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDone = this.handleDone.bind(this)
        this.createInput = this.createInput.bind(this)
    }

    handleEdit(){
        this.setState({
            edit: !this.state.edit,
            item: this.props.data.product
        })        
    }

    handleChange(ev, what){
        this.setState({
            ...this.state,
            item: {...this.state.item, [what]: ev}  
        })   
    }

    handleDone(){
        this.props.editDone(this.state.item.id, this.state.item)
        this.setState({
            ...this.state,
            edit: !this.state.edit,
        })  
        this.props.getProduct(this.state.item.id)

    }

    createInput(what){
        return (
            <input 
                type="text" 
                onChange={(ev) => this.handleChange(ev.target.value, what)}
                value={this.state.item[what]} />)
    }

    render(){
        const {product} = this.props.data

        return (
            <div className="product">
                <img className="imgDetails" src={product.image_link} alt={product.name} />
                {!this.state.edit && (
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
                        <p className="textDetails">{product.product_types}</p>
                        <b>Tags: </b>
                        <p className="textDetails">{product.tag_list}</p>
                        <b>Colors: </b>
                        <div id="colors">
                            {product.product_colors.map(clr => 
                                <div 
                                    key={clr.colour_name} 
                                    className="color" 
                                    style={{backgroundColor:clr.hex_value}}>
                                </div>)}
                        </div>
                        <input type="button" onClick={() => this.handleEdit()} value="Edit"/>                    
                    </div>
                )}
                {this.state.edit && (
                    <div className="textAlign">
                        <b>Name: </b><br/>
                        {this.createInput('name')}<br/>
                        <b>Brand: </b><br/>
                        {this.createInput('brand')}<br/>
                        <b>Price: </b><br/>
                        {this.createInput('price')}<br/>
                        <b>Currency: </b>
                        <p className="textDetails">{product.currency}</p>
                        <b>Description: </b><br/>
                        <textarea 
                            className="description"
                            onChange={(ev) => this.handleChange(ev.target.value, 'description')} 
                            value={this.state.item.description} /><br/>
                        <b>Category: </b><br/>
                        {this.createInput('category')}<br/>
                        <b>Type: </b><br/>
                        {this.createInput('product_types')}<br/>
                        <b>Tags: </b>
                        <p className="textDetails">{product.tag_list}</p>
                        <b>Colors: </b>
                        <div id="colors">
                            {product.product_colors.map(clr => 
                                <div 
                                    key={clr.colour_name} 
                                    className="color" 
                                    style={{backgroundColor:clr.hex_value}}>
                                </div>)}
                        </div>
                        <input type="button" onClick={() => this.handleDone()} value="Done"/>         
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.product,
})

export default connect(mapStateToProps, {editDone, getProduct})(Details)
