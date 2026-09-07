import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddPost() {

    let navigate = useNavigate();
    const initialValues = {
        title: "",
        content: "",
        username: ""
    }

    const onSubmit = (data) => {
        console.log(data);
        axios.post(`${process.env.REACT_APP_API_URL}`, data).then((res) => {
            if (res.status === 200) {
                navigate('/');            }
        })
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        content: yup.string().required(),
        username: yup.string().required()
    })

    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ resetForm }) => (
                    <Form className='formContainer'>
                        <label>Title* : </label>
                        <ErrorMessage name="title" component="span"></ErrorMessage>

                        <Field id="inputCreatePost" name="title" placeholder="Enter the Title"></Field>
                        <label>Content* : </label>
                        <ErrorMessage name="content" component="span"></ErrorMessage>

                        <Field id="inputCreatePost" name="content" placeholder="Enter the post"></Field>
                        <label>Username* : </label>
                        <ErrorMessage name="username" component="span"></ErrorMessage>

                        <Field id="inputCreatePost" name="username" placeholder="Enter the username"></Field>

                        <button type='submit'>Add Post</button>
                        <button onClick={() => {
                            resetForm()
                        }}>Reset</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddPost