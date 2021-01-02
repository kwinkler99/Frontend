import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'
import {editProduct} from '../Actions/editProduct'
import {getProduct} from '../Actions/getProduct'
import {editDone} from '../Actions/editDoneProduct'
import {deleteProduct} from '../Actions/deleteProduct'
import './loadData.css'


class LoadData extends Component {
    constructor(props){
        super(props)

        this.state = {
            edit: []
        }

        this.handleProduct = this.handleProduct.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChangeEdit = this.handleChangeEdit.bind(this)
        this.handleEditDone = this.handleEditDone.bind(this)
    }

    componentDidMount(){
        this.props.getData() 
    }

    handleProduct(id, active){
        if (!active){
            this.props.history.push('/product')
            this.props.getProduct(id)
        }
    }

    handleEdit(id, item){
        this.setState({
            edit: [...this.state.edit, item]
        })
        this.props.editProduct(id)
    }

    handleDelete(id){
        this.props.deleteProduct(id)
    }

    handleChangeEdit(event, what, id){
        const editResult = this.state.edit.map(s => {
            if (s.id === id){
                s[what] = event
            }
            return s
        })

        this.setState({
            edit: editResult
        })
    }

    handleEditDone(id){
        const product = this.state.edit.filter(a => a.id === id)[0]
        this.props.editDone(id, {...product, active: false })
    }

    render() {
        const {data} = this.props.data

        return(
            <div className="view">
                {data.map(item => 
                    <div className="item" key={item.id} >
                        <div onClick={() => this.handleProduct(item.id, item.active)}>
                            <img src={item.image} alt={item.name} />
                            {!item.active && (
                                <div className="text">
                                    <p className="brand">{item.brand}</p> 
                                    <p className="name">{item.name}</p>
                                    <p className="category">Category: {item.category}</p>
                                    <p className="price">{"$" + item.price}</p> 
                                </div>
                            )}
                            {item.active && (
                                <div className="textEdit">
                                    <input 
                                        type="text" 
                                        value={this.state.edit.find(s => s.id === item.id).brand} 
                                        onChange={(ev) => this.handleChangeEdit(ev.target.value, "brand", item.id)} />
                                    <input 
                                        type="text" 
                                        value={this.state.edit.find(s => s.id === item.id).name} 
                                        onChange={(ev) => this.handleChangeEdit(ev.target.value, "name", item.id)} />
                                    <input 
                                        type="text" 
                                        value={this.state.edit.find(s => s.id === item.id).category} 
                                        onChange={(ev) => this.handleChangeEdit(ev.target.value, "category", item.id)} />
                                    <input 
                                        type="text" 
                                        value={this.state.edit.find(s => s.id === item.id).price} 
                                        onChange={(ev) => this.handleChangeEdit(ev.target.value, "price", item.id)} />
                                </div>
                            )}
                        </div>
                        <div className="button">
                            <input
                                className="edit" 
                                type="button" 
                                value="Delete"
                                onClick={() => this.handleDelete(item.id)}/>
                            {item.active && (
                                <input 
                                    className="edit" 
                                    type="button"
                                    value="Done"
                                    onClick={() => this.handleEditDone(item.id)}/>
                            )}
                            {!item.active && (
                                <input 
                                    className="edit" 
                                    type="button"
                                    value="Edit"
                                    onClick={() => this.handleEdit(item.id, item)}/>
                            )}
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

export default connect(mapStateToProps, {getData, getProduct, editProduct, editDone, deleteProduct})(LoadData)
