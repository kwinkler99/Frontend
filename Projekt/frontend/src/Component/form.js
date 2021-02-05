import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'
import {editDone} from '../Actions/editDoneProduct'
import {deleteProduct} from '../Actions/deleteProduct'
import {newProduct} from '../Actions/newProduct'
import {deleteAllProducts} from '../Actions/deleteAll'
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
                    content: "",
                    validation: {
                        email: false,
                        content: false
                    }
                }
            ],
            validation: {
                name: false,
                description: false,
            },
            deleteAll: false,
            delete: false
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
                    id: take_product.comments.length,
                    accept: false,
                    email: "",
                    content: "",
                    validation: {
                        email: false,
                        content: false
                    }
                }],
            validation: {
                name: false,
                description: false,
            },
            deleteAll: false,
            delete: false
        })     
    }

    handleChange(ev, what){
        this.setState({
            ...this.state,
            product: {...this.state.product, [what]: ev}  
        })   
    }

    createInput(word, what){
        if(what !== 'product_colors' && what !== 'comments' ){
            return ((what !== 'description' && what !== 'id' && what !== 'active' && what !== 'name' &&
                <div key={what}>
                    <b>{word}</b><br/>
                    <input
                        type="text" 
                        onChange={(ev) => this.handleChange(ev.target.value, what)}
                        value={this.state.product[what]} /><br/>
                </div>
                ) || (what === 'description' &&
                <div key={what}>
                    <b>{word}</b><br/>
                    <textarea 
                        className="description"
                        onChange={(ev) => this.handleChange(ev.target.value, 'description')} 
                        value={this.state.product.description} /><br/>
                    {this.state.validation.description && (<p className="error">At least 100 letters in description</p>)}
                </div>
                ) || (what === 'name' && 
                <div key={what}>
                    <b>{word}</b><br/>
                    <input
                        type="text"
                        onChange={(ev) => this.handleChange(ev.target.value, 'name')} 
                        value={this.state.product.name} /><br/>
                    {this.state.validation.name && (<p className="error">Name is required</p>)}
                </div>))}   
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
            if(this.state.product.description.split("").length < 100){
                this.setState({...this.state, 
                    validation: {
                        name: true,
                        description: true
                    }
                })
            }
            else{
                this.setState({...this.state, 
                    validation: {
                        name: true,
                        description: false
                    }
                })
            }
        }
        else if(this.state.product.description.split("").length < 100){
            this.setState({...this.state, 
                validation: {
                    name: false,
                    description: true
                }
            })
        }
        else{
            if(this.state.take !== 'new-product'){
                this.props.editDone(this.state.product.id, {...this.state.product})             
                this.setState({
                    take: "new-product",
                    product: prepare_product,
                    comments: [
                        {
                            id: 0,
                            accept: false,
                            email: "",
                            content: "",
                            validation: {
                                email: false,
                                content: false
                            }
                        }
                    ],
                    validation: {
                        name: false,
                        description: false,
                    },
                    deleteAll: false,
                    delete: false
                })
            }
            else{
                const filterComment = this.state.comments.filter(item => item.accept !== false)
                const new_product = this.state.product
                new_product['id'] = id + 1
                console.log(new_product.id)
                this.props.newProduct({...new_product, comments: filterComment})
                this.setState({
                    ...this.state,
                    product: prepare_product,
                    comments: [
                        {
                            id: 0,
                            accept: false,
                            email: "",
                            content: "",
                            validation: {
                                email: false,
                                content: false
                            }
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
                take: "new-product",
                product: prepare_product,
                comments: [
                    {
                        id: 0,
                        accept: false,
                        email: "",
                        content: "",
                        validation: {
                            email: false,
                            content: false
                        }
                    }
                ],
                validation: {
                    name: false,
                    description: false,
                },
                deleteAll: false,
                delete: true
            })

            setTimeout(() => {
                this.setState({...this.state,
                    delete: false
                })
            }, 1000)
        }
    }   

    handleDeleteAll(){
        let result = window.confirm("Do you want delete all data?")
        if (result === true){
            this.props.deleteAllProducts()
            this.setState({take: "new-product",
            product: prepare_product,
            comments: [
                {
                    id: 0,
                    accept: false,
                    email: "",
                    content: "",
                    validation: {
                        email: false,
                        content: false
                    }
                }
            ],
            validation: {
                name: false,
                description: false,
            },
            deleteAll: true,
            delete: false
            })

            setTimeout(() => {
                this.setState({...this.state,
                    deleteAll: false
                })
            }, 3000)

        }


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
                    content: "",
                    validation: {
                        email: false,
                        content: false
                    }
                }
            ],
            validation: {
                name: false,
                description: false,
            },
            deleteAll: false,
            delete: false
        })
    }

    handelAddComment(){
        const re = /\S+@\S+\.\S+/
        const id = this.state.comments[this.state.comments.length - 1].id + 1
        const com = this.state.comments
        if(!re.test(this.state.comments[id - 1].email)){
            if(this.state.comments[id - 1].content.length === 0){
                com[this.state.comments.length - 1].validation.email = true
                com[this.state.comments.length - 1].validation.content = true
                this.setState({...this.state, 
                    comments: com
                })
            }
            else{
                com[this.state.comments.length - 1].validation.email = true
                com[this.state.comments.length - 1].validation.content = false

                this.setState({...this.state, 
                    comments: com
                })
            }
        }
        else if(this.state.comments[id - 1].content.length === 0){
            com[this.state.comments.length - 1].validation.email = false
            com[this.state.comments.length - 1].validation.content = true

            this.setState({...this.state, 
                comments: com
            })
        }
        else{ 
            const upload = this.state.comments.map(item => {
                if(item.id === id - 1){
                    item.accept = true;
                    item.validation.email = false;
                    item.validation.content = false;
                    return item
                }
                return item
            })
            if(this.state.take !== 'new-product'){   
                const take_product = this.props.data.data.filter(item => item.id === parseInt(this.state.take))[0]
                this.props.editDone(take_product.id, {...take_product, comments: upload})
            }
            this.setState({
                ...this.state, 
                comments: [
                    ...upload,
                    {
                        id: id,
                        accept: false,
                        email: "",
                        content: "",
                        validation: {
                            email: false,
                            content: false
                        }
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
                {this.state.deleteAll && (
                    <div className="confirmDeleteAll">You delete all data. Now you can start create your own products!</div>
                )}
                {this.state.delete && (
                    <div className="confirmDeleteAll">Deleted!!!</div>
                )}
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
                            onClick={() => this.handleDone(data.length > 0 ? data[0].id : 0)}/>
                        <input
                            type="button"
                            value="Delete this product"
                            onClick={() => this.handleDelete()}/>
                        <input
                            type="button"
                            value="Delete all products"
                            onClick={() => this.handleDeleteAll()}/>
                        <input 
                            type="button"
                            value="Reset"
                            onClick={() => {this.handleReset()}}/>
                    </div>
                    <b>Komentarze</b>
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
                    {this.state.comments.map(comment => (
                        <div className="comment" key={comment.id}>
                            <input
                                className="emailComment" 
                                type="text"
                                value={comment.email}
                                onChange={(ev) => !comment.accept && this.handleChangeComment(ev.target.value, 'email', comment.id)}
                                placeholder="Email"/>
                            {comment.validation.email && (<p className="error">Wrong email</p>)}
                            <textarea
                                placeholder="Content"
                                onChange={(ev) => !comment.accept && this.handleChangeComment(ev.target.value, 'content', comment.id)} 
                                value={comment.content}/>
                            {comment.validation.content && (<p className="error">Empty content</p>)}
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

export default connect(mapStateToProps, {getData, editDone, deleteProduct, newProduct, deleteAllProducts})(Form)
