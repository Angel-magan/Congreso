import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Autores = ({ onAutoresChange }) => {
    const [autoresDisponibles, setAutoresDisponibles] = useState([
        'Autor 1',
        'Autor 2',
        'Autor 3',
        'Autor 4',
    ]);
    const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
    const [autorSeleccionado, setAutorSeleccionado] = useState('');

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
        if (onAutoresChange) {
            onAutoresChange(autoresSeleccionados);
        }
    }, [autoresSeleccionados, onAutoresChange]);

    return (
        <div className="w-100">
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
                            <option key={autor} value={autor}>
                                {autor}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn-outline-secondary"
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