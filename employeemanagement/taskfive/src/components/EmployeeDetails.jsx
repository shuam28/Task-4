import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'

function EmployeeDetails() {
  const [data, setData] = useState([])
  const {id} = useParams();
  useEffect(()=> {
    axios.get('http://localhost:5000/getdetailEmp/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Password</th>
              <th>Hobbies</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {data.map((employee, index) => {
              return <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
                <td>{employee.password}</td>
                <td>{employee.hobbies}</td>
                <td>{employee.location}</td>
                <td>{employee.salary}</td>
                  <td>
                    <Link to={`/employeeEdit/`+employee.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeDetails