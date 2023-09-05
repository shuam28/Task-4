import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Start from './Start'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Home from './components/Home'
import EmployeeLogin from './components/EmployeeLogin'
import Register from './components/Register'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import Profile from './components/Profile';
import SalesEmp from './components/SalesEmp'
import EmployeeDetails from './components/EmployeeDetails'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home />}></Route>
        {/* <Route path='/employee' element={<Employee />}></Route> */}
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/salesemp' element={<SalesEmp/>}></Route>
        <Route path='/addemployee' element={<AddEmployee />}></Route>
        <Route path='/employeeEdit/:id' element={<EditEmployee />}></Route>
      </Route>

      <Route path='/login' element={<Login />}></Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
      <Route path='/employeedetail/:id' element={<EmployeeDetails />}></Route>
     
    </Routes>
    </BrowserRouter>
  )
}

export default App