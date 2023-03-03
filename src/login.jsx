import React from 'react';
import {useHistory} from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is Required'),
        password: Yup.string()
            .required('Password is required')
    }
);


const Login = () => {
    const initialCredentials ={
        email: '',
        password:''
    }

    const  history = useHistory();

    const navigateTo = (path) =>{
        history.push(path)
    }

    return (
      <div>
        <h4>Login Formik</h4>
        <Formik
          initialValues={initialCredentials}
          // YUP VALIDATION SCHEMA
          validationSchema = {loginSchema}
        
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
            // WE SAVE THE DATA IN THE LOCAL STORAGE
            await localStorage.setItem('credentials', values)
            history.push('/tasks')
          }}
        >
          {/* we obtain props from Formik */}

          {({ values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur }) => (
                <Form>
            <label htmlFor="email">Email</label>
            <Field id="email" type="email" name="email" placeholder="example@email.com" />
              {/* EMAIL ERRORS */}
            {
              errors.email && touched.email && (
                  <ErrorMessage name="email" component='div' />
              )
            }

            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
            {/* ERROR PASSWORD */}
            {
              errors.password && touched.password && (
                // <div className='error'>
                //   <p> {errors.password} </p>
                // </div>
                <ErrorMessage name="password" component='div' />
              )
            }
            <button type="submit">Login</button>
            {isSubmitting ? ( <p>Login your credentials...</p> ) : null}
            
          </Form>
          

          )}

        </Formik>
        <button onClick={() => navigateTo('/register')} >
                Go to Register
            </button>
      </div>
    );
}

export default Login;
