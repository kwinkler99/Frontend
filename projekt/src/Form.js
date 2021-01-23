import React, { Component }  from 'react';
import {connect} from 'react-redux'


class Form extends Component {
    constructor(props){
        super(props)

        this.state = {
            take: "new-product" 
        }

        this.takeProduct = this.takeProduct.bind(this)
    }

    takeProduct(event){
        this.setState({
            ...this.state,
            take: event
        })
    }

    render(){ 
        const {data} = this.props.data
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
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {})(Form)
