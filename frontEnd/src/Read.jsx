import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

function Read() {

  const {id} = useParams();
  const [student,setStudent] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8081/read/${id}`)
      .then(res => {
        console.log("Datos recibidos del backend:", res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setStudent(res.data[0]); // Guardamos solo el objeto dentro del array
        } else {
          console.warn("No se encontraron datos para este ID");
        }
      })
      .catch(err => console.error("Error al obtener datos:", err));
  }, [id]);
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center' >
      <div className='w-50 bg-white rounded p-3'> 
        <h2>Detalles del Estudiante</h2>
        {student ? (
          <>
            <h2>{student.id || "Cargando ID..."}</h2>
            <h2>{student.name || "Cargando Nombre..."}</h2>
            <h2>{student.email || "Cargando Email..."}</h2>
          </>
        ) : (
          <h2>Cargando datos...</h2>
        )}
        <div className='p-2 d-flex'>
          <Link to="/" className='btn btn-outline-danger me-2'>Atrás</Link>
          <Link to={`/edit/${student.id}`} className='btn btn-outline-warning'>Editar</Link>
        </div>
        
      </div>
    </div>
  )
}

export default Read