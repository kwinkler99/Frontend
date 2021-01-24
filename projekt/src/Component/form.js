import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'
import {editDone} from '../Actions/editDoneProduct'
import {deleteProduct} from '../Actions/deleteProduct'
import {newProduct} from '../Actions/newProduct'
import './form.css'



const prepare_product = {
    id: "new",
    name: "",
    brand: "",
    price: "0",
    currency: "",
    image_link: "",
    description: "",
    category: "",
    product_types: "",
    product_colors: [],
    tag_list: "",
    active: "",
    comments: []
}


class Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            take: "new-product",
            product: prepare_product,
            comments: [
                {
                    id: 0,
                    accept: false,
                    email: "",
                    content: ""
                }
            ]
        }

        this.takeProduct = this.takeProduct.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.createInput = this.createInput.bind(this)
        this.handleDone = this.handleDone.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteAll = this.handleDeleteAll.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handelAddComment = this.handelAddComment.bind(this)
        this.handleChangeComment = this.handleChangeComment.bind(this)
    }

    componentDidMount(){
        this.props.getData() 
    }

    takeProduct(event){
        const take_product = event !== "new-product" ? this.props.data.data.filter(item => item.id === parseInt(event))[0] : prepare_product
        this.setState({
            take: event,
            product: {...take_product},
            comments: [...take_product.comments, 
                {
                    id: 0,
                    accept: false,
                    email: "",
                    content: ""
                }]
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
        const product = this.state.product
        if(product.brand.length === 0){
            product.brand = "other"
        }
        if(product.price.length === 0){
            product.price = "0"
        }
        if(product.category.length === 0){
            product.category = "other"
        }
        this.setState({...this.state, product: {...product}})



        if(this.state.product.name.length === 0){
            alert("Name is required")
        }
        else if(this.state.product.description.split("").length < 100){
            alert("At least 100 letters in description")
        }
        else{
            if(this.state.take !== 'new-product'){
                const filterComment = this.state.comments.filter(item => item.accept !== false)
                this.props.editDone(this.state.product.id, {...this.state.product, comments: filterComment})
                
                this.setState({
                    take: "new-product",
                    product: prepare_product,
                    comments: [
                        {
                            id: 0,
                            accept: false,
                            email: "",
                            content: ""
                        }
                    ]
                })
            }
            else{
                const filterComment = this.state.comments.filter(item => item.accept !== false)
                const new_product = this.state.product
                new_product['id'] = id + 1
                this.props.newProduct({...new_product, comments: filterComment})
                this.setState({
                    ...this.state,
                    product: prepare_product,
                    comments: [
                        {
                            id: 0,
                            accept: false,
                            email: "",
                            content: ""
                        }
                    ]
                })
            }
            this.props.getData() 
        }
    }

    handleDelete(){
        if(this.state.take !== 'new-product'){
            this.props.deleteProduct(this.state.product.id)
            this.setState({
                ...this.state, product: prepare_product
            })
        }
    }   

    handleDeleteAll(ev, what){
        console.log()
    }

    handleReset(){
        this.setState({
            take: "new-product",
            product: prepare_product,
            comments: [
                {
                    id: 0,
                    accept: false,
                    email: "",
                    content: ""
                }
            ]
        })
    }

    handelAddComment(){
        const re = /\S+@\S+\.\S+/
        const id = this.state.comments[this.state.comments.length - 1].id + 1
        if(!re.test(this.state.comments[id - 1].email)){
            alert("Wrong email")
        }
        else if(this.state.comments[id - 1].content.length === 0){
            alert("Empty content")
        }
        else{
            const upload = this.state.comments.map(item => {
                if(item.id === id - 1){
                    item.accept = true;
                    return item
                }
                return item
            })
            this.setState({
                ...this.state, 
                comments: [
                    ...upload,
                    {
                        id: id,
                        accept: false,
                        email: "",
                        content: ""
                    }
                ]
            })
        }
    }

    handleChangeComment(ev, what, id){
        const upload = this.state.comments.map(item => {
            if (item.id === id){
                return {...item, [what]: ev}
            }
            else{
                return item
            }
        })
        this.setState({
            ...this.state,
            comments: upload  
        })   
    }

    render(){ 
        const {data} = this.props.data
        const keys = Object.keys(prepare_product)

        return(
            <div className="form">
                <div className="formEdit">
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
                    <div className="form-input">
                        {keys.map(item => {
                            return this.createInput(`${item}: `, item)
                        })}
                    </div>
                    <b>Colors: </b>
                    <div id="colors">
                        {this.state.product.product_colors.map(clr => 
                            <div
                                key={clr.colour_name} 
                                className="color" 
                                style={{backgroundColor:clr.hex_value}}>
                            </div>)}
                    </div>
                    <div className="allButton-form">
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
                        <input 
                            type="button"
                            value="Reset"
                            onClick={() => {this.handleReset()}}/>
                    </div>
                </div>
                <div className="img-buttton">
                    <input 
                        className="formButton"
                        type="button"
                        value="Return to main page"
                        onClick={() => this.props.history.push("/")}/>
                    {this.state.product.image_link && (
                    <img className="imgDetails-form" src={this.state.product.image_link} alt={this.state.product.name} />)}
                </div>
                    <b>Komentarze</b>
                        {this.state.comments.map(comment => (
                            <div className="comment" key={comment.id}>
                                <input 
                                    type="text"
                                    value={comment.email}
                                    onChange={(ev) => !comment.accept && this.handleChangeComment(ev.target.value, 'email', comment.id)}
                                    placeholder="Email"/>
                                <textarea
                                    placeholder="Content"
                                    onChange={(ev) => !comment.accept && this.handleChangeComment(ev.target.value, 'content', comment.id)} 
                                    value={comment.content}/>
                                {!comment.accept && (
                                <input 
                                    className="addComment"
                                    onClick={() => this.handelAddComment()}
                                    type="button"
                                    value="Add comment"/>)}
                            </div>
                        ))}
                </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {getData, editDone, deleteProduct, newProduct})(Form)
