import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate =useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = async(event) => {
        event.preventDefault();
        
       const postdata= await axios.post('http://localhost:5000/login', values)
       
       console.log("postdata",postdata)
       if(postdata.data.Status==="Success"){
        navigate('/home')
       }
           
    }
  return (
    <>
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                               value={values.email} onChange={e => setValues({ ...values, email: e.target.value })} 
                               className='form-control rounded-0' />
                    </div>
                    <div className='mc-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' 
                               value={values.password} onChange={e => setValues({ ...values, password: e.target.value })} 
                               className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p>You agree to our terms and policies</p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login