import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setValues({
                        name: res.data[0].name || '',
                        email: res.data[0].email || ''
                    });
                } else {
                    console.warn("No se encontraron datos para este ID.");
                }
            })
            .catch(err => console.error("Error al obtener datos:", err));
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/edit/${id}`, values)
            .then(res => {
                console.log("Datos actualizados:", res);
                navigate('/');
            })
            .catch(err => console.error("Error al actualizar:", err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleUpdate}>
                    <h2>Editando al Estudiante {values.name}</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Nombre</label>
                        <input 
                            type="text" 
                            placeholder='Coloque un nombre' 
                            className='form-control' 
                            value={values.name} 
                            onChange={e => setValues({ ...values, name: e.target.value })} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type="email" 
                            placeholder='Coloque un correo'  
                            className='form-control' 
                            value={values.email} 
                            onChange={e => setValues({ ...values, email: e.target.value })} 
                        />
                    </div>
                    <button type="submit" className='btn btn-success me-2'>Editar</button>
                    <Link to='/' className='btn btn-danger'>Atrás</Link>
                </form>
            </div>
        </div>
    );
}

export default Edit;
