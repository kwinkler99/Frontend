import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from './Actions/getData'
import {editDone} from './Actions/editDoneProduct'
import {deleteProduct} from './Actions/deleteProduct'
import {newProduct} from './Actions/newProduct'



const prepare_product = {
    id: "new",
    name: "",
    brand: "",
    price: 0,
    currency: "",
    image_link: "",
    description: "",
    category: "",
    product_types: "",
    product_colors: [],
    tag_list: "",
    active: ""
}


class Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            take: "new-product",
            product: prepare_product
        }

        this.takeProduct = this.takeProduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.createInput = this.createInput.bind(this)
        this.handleDone = this.handleDone.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteAll = this.handleDeleteAll.bind(this)

    }

    componentDidMount(){
        this.props.getData() 
    }

    takeProduct(event){
        const take_product = event !== "new-product" ? this.props.data.data.filter(item => item.id === parseInt(event))[0] : prepare_product
        this.setState({
            take: event,
            product: {...take_product}
        })     
    }

    handleChange(ev, what){
        this.setState({
            ...this.state,
            product: {...this.state.product, [what]: ev}  
        })   
    }

    createInput(word, what){
        if(what !== 'product_colors' ){
            return ((what !== 'description' && what !== 'id' && what !== 'active' &&
                <div key={what}>
                    <b>{word}</b><br/>
                    <input 
                        type="text" 
                        onChange={(ev) => this.handleChange(ev.target.value, what)}
                        value={this.state.product[what]} /><br/>
                </div>
                ) || (what === 'description' && what !== 'id' && what !== 'active' &&
                <div key={what}>
                    <b>{word}</b><br/>
                    <textarea 
                        className="description"
                        onChange={(ev) => this.handleChange(ev.target.value, 'description')} 
                        value={this.state.product.description} /><br/>
                </div>
            ))
        }
    }

    handleDone(id){
        if(this.state.take !== 'new-product'){
            this.props.editDone(this.state.product.id, this.state.product)
            
            this.setState({
                take: "new-product",
                product: prepare_product
            })
        }
        else{
            const new_product = this.state.product
            new_product['id'] = id + 1
            this.props.newProduct(new_product)
            this.setState({
                ...this.state, product: prepare_product
            })
        }
        this.props.getData() 
    }

    handleDelete(){
        if(this.state.take !== 'new-product'){
            this.props.deleteProduct(this.state.product.id)
            this.setState({
                ...this.state, product: prepare_product
            })
        }
    }   

    handleDeleteAll(){

    }

    render(){ 
        const {data} = this.props.data
        const keys = Object.keys(prepare_product)

        return(
            <div>
                <select
                    onChange={(ev) => this.takeProduct(ev.target.value)}
                    value={this.state.take}>
                    <option 
                        key="new-product"
                        value="new-product">
                    new product
                    </option>
                    {data.map(item => 
                        <option 
                            key={item.id} 
                            value={item.id}>
                        {item.id}
                        </option>
                    )}
                </select>
                {keys.map(item => {
                    return this.createInput(`${item}: `, item)
                })}
                <b>Colors: </b>
                <div id="colors">
                    {this.state.product.product_colors.map(clr => 
                        <div
                            key={clr.colour_name} 
                            className="color" 
                            style={{backgroundColor:clr.hex_value}}>
                        </div>)}
                </div>
                <input 
                    type="button"
                    value="Done"
                    onClick={() => this.handleDone(data[0].id)}/>
                <input
                    type="button"
                    value="Delete"
                    onClick={() => this.handleDelete()}/>
                <input
                    type="button"
                    value="Delete all"
                    onClick={() => this.handleDeleteAll()}/>
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {getData, editDone, deleteProduct, newProduct})(Form)
