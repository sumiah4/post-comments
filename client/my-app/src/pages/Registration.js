import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
    fullname: "",
    country: ""
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required('Password Required'),
    fullname: Yup.string().min(4, 'Minimum 4 cheracter required').max(20, 'Maximum 20 allowed').required(),
    country: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/auth/register", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />

          <label>Full Name: </label>
          <ErrorMessage name="fullname" component="span" />
          <Field
            autoComplete="off"
            type="text"
            id="inputCreatePost"
            name="fullname"
            placeholder="Your Full Name..."
          />

          <label>Country: </label>
          <ErrorMessage name="country" component="span" />
          <Field
            autoComplete="off"
            type="country"
            id="inputCreatePost"
            name="country"
            placeholder="Your Country..."
          />



          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;