import React, { Component } from 'react';
import {connect} from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Display from '../Display'

class FormikClass extends Component {
    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(values){
        this.props.send(values)
    }

    render(){
        return (
            <div>
                <h1>Post na bloga</h1>
                <Formik
                    initialValues={{ title: '', content: '', publicationDate: '', category: '' }}
                    validate={values => {
                        let today = new Date()
                        const errors = {};
                        if ( 4 > values.title.length && values.title.length < 20) {
                            errors.title = 'conajmniej 4 znaki';
                        } else if (values.content.length === 0) {
                            errors.content = 'Tresc niepusta';
                        } else if (new Date(values.publicationDate) < today){
                            errors.date = 'Zla data'
                        }
                        return errors;
                    }}
                    onSubmit={(values, {resetForm}) => {
                        this.handleSubmit(values)
                        resetForm({ title: '', content: '', publicationDate: '', category: '' })
                    }}

                    >
                    {({  getFieldProps, handleSubmit, handleChange }) => (
                        <Form> 
                            <p>Title</p>
                            <Field type="title" name="title" />
                            <ErrorMessage name="title" component="div" />
                            <p>Content</p>
                            <Field type="content" name="content" />
                            <ErrorMessage name="content" component="div" />
                            <p>PublicationDate</p>
                            <Field type="date" name="publicationDate" />
                            <ErrorMessage name="publicationDate" component="div" />
                            <select
                                name="category"
                                value={getFieldProps.category}
                                onChange={handleChange}
                            >
                                <option value="" label="Select a category" />
                                <option value="Sport" label="Sport"/>
                                <option value="News" label="News"/>
                                <option value="Economy" label="Economy"/>
                                <option value="Politics" label="Politics"/>
                            </select>
                            <button type="submit" onSubmit={() => handleSubmit} >
                                Submit
                            </button>
                        </Form>
                    )}
                    </Formik>
                    <Display />
            </div>
        )
    }
}

  
const mapDispatchToProps = (dispatch) => {
    return {
        send: (values) => {
            dispatch({ type: 'ADD_POST', new_values: values });
        }
    }
}
  
export default connect(null, mapDispatchToProps)(FormikClass);