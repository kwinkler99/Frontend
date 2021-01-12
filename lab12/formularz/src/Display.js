import React, { Component } from 'react';
import {connect} from "react-redux";
import './display.css'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
    comments: [
      {
        name: '',
        content: '',
      },
    ],
  };

const AddComment = (props) => (
    <div>
        <h1>Comments</h1>
        <Formik
        initialValues={initialValues}
        onSubmit={async (values, {resetForm}) => {
            props.handle(props.id, values.comments)
            resetForm({initialValues})
        }}
        >
        {({ values }) => (
            <Form>
            <FieldArray name="comments">
                {({ insert, remove, push }) => (
                <div>
                    {values.comments.length > 0 &&
                    values.comments.map((comment, index) => (
                        <div key={index}>
                        <div>
                            <label htmlFor={`comments.${index}.name`}>Name: </label>
                            <Field
                            name={`comments.${index}.name`}
                            placeholder="Jane Doe"
                            type="text"
                            />
                            <ErrorMessage
                            name={`comments.${index}.name`}
                            component="div"
                            className="field-error"
                            />
                        </div>
                        <div>
                            <label htmlFor={`comments.${index}.content`}>Content: </label>
                            <Field
                            name={`comments.${index}.content`}
                            placeholder="write something"
                            type="content"
                            />
                            <ErrorMessage
                            name={`comments.${index}.content`}
                            component="div"
                            className="field-error"
                            />
                        </div>
                        <div>
                            <button
                            type="button"
                            onClick={() => remove(index)}
                            >
                            Delete comment
                            </button>
                        </div>
                        </div>
                    ))}
                    <button
                    type="button"
                    onClick={() => push({ name: '', content: '' })}
                    >
                    Add comment
                    </button>
                </div>
                )}
            </FieldArray>
            <button type="submit">Submit</button>
            </Form>
        )}
        </Formik>
    </div>

)


class Display extends Component {
    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(id, values){
        this.props.addComment(id, values)
    }

    render(){
        return (
            <div>
                <h1>Wszystkie posty: </h1>
                {this.props.data.map(item => (
                    <div className="item" key={item.id}> 
                        <p>Title: {item.title}</p>
                        <p>Content: {item.content}</p>
                        <p>Publication Date: {item.publicationDate}</p>
                        <p>Category: {item.category}</p>
                        {!item.comments && (<AddComment id = {item.id} handle = {this.handleSubmit}/>)}
                        {item.comments && (<h1>Comments: </h1>) &&
                            item.comments.map(comment => (
                                <div key={comment.id}>
                                    <p>Comment nr {comment.id}</p>
                                    <p>Name: {comment.name}</p>
                                    <p>Text: {comment.content}</p>
                                </div>
                            )
                        )}
                    </div>
                ))}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.formularz
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (id, values) => {
            dispatch({ type: 'ADD_COMMENT', id: id, new_values: values });
        }
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(Display);
