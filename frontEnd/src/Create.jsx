import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function create() {
    const [values, setValues] = useState({
        name: '',
        email: ''
    })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/student', values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Crear Un Nuevo Estudiante</h2>
                <div className='mb-2'>
                    <label htmlFor='' >Name</label>
                    <input type="text" placeholder='Coloque un nombre' className='form-control' onChange={e => setValues({...values, name: e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>Email</label>
                    <input type="email" placeholder='Coloque un correo'  className='form-control' onChange={e => setValues({...values, email: e.target.value})} />
                </div>
                <button className='btn btn-success'>Crear</button>
                <Link to='/' className='btn btn-danger'>atras</Link>
            </form>
        </div>
    </div>
  )
}

export default create