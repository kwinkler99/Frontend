import React, { Component }  from 'react';
import {connect} from 'react-redux'
import {getData} from '../Actions/getData'



class LoadData extends Component {

    componentDidMount(){
        this.props.getData() 
    }

    render() {
        const {data} = this.props.data

        return(
            <div>
                {data.map(item => 
                    <div key={item.id}>
                        <p>{item.id + " " + item.name}</p> 
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({
    data: state.products,
})

export default connect(mapStateToProps, {getData})(LoadData)
