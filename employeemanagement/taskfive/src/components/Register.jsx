import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        name: '',
        lastname:'',
        email: '',
        password: '',
        gender:'',
        hobbies:'',
        dept_name:'',
        category:'',
        location:'',
        salary:''
      })
      const navigate = useNavigate();
      const handleSubmit = (event) => {
        console.log(values)
        event.preventDefault();
        axios.post('http://localhost:5000/signup', values) //values
          .then(res => {
         
            if (res.data.Status === "Success") {
             
              navigate('/')
            
            } else {
              alert("Error");
            }
          })
          .then(err => console.log("Error"));
      }


  return (
    <>
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-30'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name:</strong></label>
            <input type="text" placeholder='Enter Name'required name='name'
             value={values.name} onChange={e => setValues({ ...values, name: e.target.value })}
              className='form-control rounded-0' />
          </div>

          <div className='mb-3'>
            <label htmlFor="name"><strong>lastname:</strong></label>
            <input type="text" placeholder='Enter lastname' required lastname='name'
             value={values.lastname} onChange={e => setValues({ ...values, lastname: e.target.value })}
              className='form-control rounded-0' />
          </div>

          <div className='mb-3'>
            <label htmlFor="email"><strong>Email:</strong></label>
            <input type="email" placeholder='Enter Email' name='email'
             value={values.email} required onChange={e => setValues({ ...values, email: e.target.value })}
              className='form-control rounded-0' />
          </div>
          <div className='mc-3'>
            <label htmlFor="password"><strong>Password:</strong></label>
            <input type="password" placeholder='Enter Password' name='password'
             value={values.password} required onChange={e => setValues({ ...values, password: e.target.value })}
              className='form-control rounded-0' />
          </div>

          <div className='mb-3'>
            <label htmlFor="name"><strong>Gender</strong></label>
            <input type="text" placeholder='Enter gender' gender='name'
             value={values.gender} required onChange={e => setValues({ ...values, gender: e.target.value })}
              className='form-control rounded-0' />
          </div>

          <div className='mb-3'>
            <label htmlFor="name"><strong>Hobbies</strong></label>
            <input type="text" placeholder='Enter Hobbies' hobbies='name'
             value={values.hobbies} required onChange={e => setValues({ ...values, hobbies: e.target.value })}
              className='form-control rounded-0' />
          </div>
          <div className='mc-3'>
            <label htmlFor="department name"><strong>Department name</strong></label>
            <input type="text" placeholder='Enter department name' name='department name'
             value={values.dept_name} required onChange={e => setValues({ ...values, dept_name: e.target.value })}
              className='form-control rounded-0' />
          </div>
          <div className='mc-3'>
            <label htmlFor="category"><strong>Category Name:</strong></label>
            <input type="text" placeholder='Enter Category Name' name='Category Name'
             value={values.category} required onChange={e => setValues({ ...values, category: e.target.value })}
              className='form-control rounded-0' />
          </div>
          <div className='mc-3'>
            <label htmlFor="location"><strong>Location:</strong></label>
            <input type="text" placeholder='Enter Location' name='location'
             value={values.location}required onChange={e => setValues({ ...values, location: e.target.value })}
              className='form-control rounded-0' />
          </div>
          <div className='mc-3'>
            <label htmlFor="salary"><strong>Salary:</strong></label>
            <input type="number" placeholder='Enter Salary' name='Salary'
             value={values.salary} required onChange={e => setValues({ ...values, salary: e.target.value })}
              className='form-control rounded-0' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
          <p>You agree to our terms and policies</p>
          <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
            Log In
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Register


