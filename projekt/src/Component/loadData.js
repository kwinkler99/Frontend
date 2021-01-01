import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'
import {getProduct} from '../Actions/getProduct'
import './loadData.css'


class LoadData extends Component {
    constructor(props){
        super(props)

        this.handleProduct = this.handleProduct.bind(this)
    }

    componentDidMount(){
        this.props.getData() 
    }

    handleProduct(id){
        this.props.history.push('/product')
        this.props.getProduct(id)
    }

    render() {
        const {data} = this.props.data

        return(
            <div className="view">
                {data.map(item => 
                    <div className="item" key={item.id} onClick={() => this.handleProduct(item.id)}>
                        <img src={item.image} alt={item.name} />
                        <div className="text">
                            <p className="brand">{item.brand}</p> 
                            <p className="name">{item.name}</p>
                            <p className="category">Category: {item.category}</p>
                            <p className="price">{"$" + item.price}</p> 
                        </div>
                        <div className="button">
                            <input
                                className="edit" 
                                type="button" 
                                value="Delete"/>
                            <input 
                                className="edit" 
                                type="button"
                                value="Edit"/>
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

export default connect(mapStateToProps, {getData, getProduct})(LoadData)
