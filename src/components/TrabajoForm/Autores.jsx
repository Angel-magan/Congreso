import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Autores = ({ onAutoresChange }) => {
    const [autoresDisponibles, setAutoresDisponibles] = useState([]);
    const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
    const [autorSeleccionado, setAutorSeleccionado] = useState('');
    const [error, setError] = useState(null);

    const handleAutorChange = (e) => {
        setAutorSeleccionado(e.target.value);
    };

    const agregarAutor = () => {
        if (autorSeleccionado) {
            const autorSeleccionadoObj = autoresDisponibles.find(autor => autor.nombre === autorSeleccionado);
            if (autorSeleccionadoObj && !autoresSeleccionados.some(autor => autor.id === autorSeleccionadoObj.id)) {
                setAutoresSeleccionados([...autoresSeleccionados, autorSeleccionadoObj]);
                setAutorSeleccionado('');
            }
        }
    };

    const eliminarAutor = (event, autorAEliminar) => {
        event.preventDefault();
        setAutoresSeleccionados(
            autoresSeleccionados.filter(autor => autor.id !== autorAEliminar.id)
        );
    };

    useEffect(() => {
        const fetchAutores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/autores');
                console.log("Datos recibidos de la API:", response.data); 
                setAutoresDisponibles(response.data);
                setError(null);
            } catch (err) {
                setError('Error al cargar los autores.');
                console.error('Error fetching autores:', err);
            }
        };

        fetchAutores();
    }, []);

    useEffect(() => {
        if (onAutoresChange) {
            //const autoresIds = autoresSeleccionados.map(autor => autor.id);
            //onAutoresChange(autoresIds);
            onAutoresChange(autoresSeleccionados);
        }
    }, [autoresSeleccionados, onAutoresChange]);

    return (
        <div className="w-100">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <div className="input-group">
                    <select
                        className="form-select"
                        id="autores"
                        value={autorSeleccionado}
                        onChange={handleAutorChange}
                    >
                        <option value="">Selecciona un autor</option>
                        {autoresDisponibles.map((autor) => (
                            <option key={autor.id} value={autor.nombre}>
                                {autor.nombre + " || " + autor.correo}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={agregarAutor}
                    >
                        Agregar
                    </button>
                    <span className="text-primary fw-bolder fs-3 px-2">*</span>
                </div>
            </div>

            <p className="mb-3 text-body-tertiary text-end">
                * Al menos uno de los co-autores debe de ser congresista
            </p>

            <div className="border p-3 rounded">
            <p className="me-1 fw-bold fs-5">Lista de autores:</p>
                {autoresSeleccionados.map((autor, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            value={autor.nombre + " || " + autor.correo}
                            readOnly
                        />
                        <button
                            className="btn btn-outline-danger btn-sm ms-2"
                            onClick={(event) => eliminarAutor(event, autor)}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Autores;