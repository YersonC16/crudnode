import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'


function Home(){
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/delete/${id}`)
        .then(res => {
            location.reload(res);
        })
        .catch(err => console.log(err))
    }

  return(
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3"> 
            <h2>Student List</h2>
            <Link to="/create" className="d-flex justify-content-end">
                <div className="btn btn-success" >Crear Estudiante</div>
            </Link>
            
            <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <Link to={`/read/${student.id}`} className="btn btn-sm btn-info">
                                            Ver Más
                                        </Link>
                                        <Link to={`/edit/${student.id}`} className="btn btn-sm btn-primary mx-2">
                                            Editar
                                        </Link>
                                        <Link onClick={() => handleDelete(student.id)} className="btn btn-sm btn-danger">
                                            Eliminar
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No hay estudiantes registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default Home