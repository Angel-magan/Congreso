import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Importa axios

const Autores = ({ onAutoresChange }) => {
    const [autoresDisponibles, setAutoresDisponibles] = useState([]);
    const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
    const [autorSeleccionado, setAutorSeleccionado] = useState('');
    const [error, setError] = useState(null); // Estado para manejar errores

    const handleAutorChange = (e) => {
        setAutorSeleccionado(e.target.value);
    };

    const agregarAutor = () => {
        if (autorSeleccionado && !autoresSeleccionados.includes(autorSeleccionado)) {
            setAutoresSeleccionados([...autoresSeleccionados, autorSeleccionado]);
            setAutorSeleccionado('');
        }
    };

    const eliminarAutor = (event, autorAEliminar) => {
        event.preventDefault();
        setAutoresSeleccionados(
            autoresSeleccionados.filter((autor) => autor !== autorAEliminar)
        );
    };

    useEffect(() => {
        const fetchAutores = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/trabajos'); // Reemplaza '/api/autores' con la URL de tu API
                setAutoresDisponibles(response.data); // Asume que la API devuelve un array de autores
                setError(null); // Limpia cualquier error previo
            } catch (err) {
                setError('Error al cargar los autores.');
                console.error('Error fetching autores:', err);
            }
        };

        fetchAutores();
    }, []);

    useEffect(() => {
        if (onAutoresChange) {
            onAutoresChange(autoresSeleccionados);
        }
    }, [autoresSeleccionados, onAutoresChange]);

    return (
        <div className="w-100">
            {error && <div className="alert alert-danger">{error}</div>} {/* Muestra el mensaje de error */}
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
                                {"ID autor: " + autor.id + " || "}
                                {"Nombre: " + autor.nombre}
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
                {autoresSeleccionados.map((autor, index) => (
                    <div key={index} className="mb-2 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            value={autor}
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