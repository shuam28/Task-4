import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SalesEmp() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:5000/salesDeptEmployee')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:5000/delete/' + id)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = data.slice(startIndex, endIndex);

  return (
    <>
      <div className='px-5 py-3'>
        <div className='d-flex justify-content-center mt-2'>
          <h3>Sales Department Employee's</h3>
        </div>
       
        <div className='mt-3'>
          <table className='table'>
          <thead>
              <tr>
               <th>Name</th>
               <th>Lastname</th>
                <th>Department</th>
                
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr key={index}>
                 <td>{employee.name}</td>
                 <td>{employee.lastname}</td>
                  <td>{employee.dept_name}</td>
                  <td>
                    <Link to={`/employeeEdit/` + employee.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='btn btn-primary btn-sm me-2'> Previous</button>
            <span>{currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='btn btn-primary btn-sm me-2' style={{marginLeft:'10px'}}> Next</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SalesEmp;
