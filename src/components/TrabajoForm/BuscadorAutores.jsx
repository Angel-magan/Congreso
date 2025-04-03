// components/TrabajoForm/Autores.js
import React, { useState } from 'react';

const BuscadorAutores = ({ onAutoresChange, autoresDisponibles }) => {
    const [query, setQuery] = useState("");
    const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleAutorSeleccionado = (autor) => {
        setAutoresSeleccionados((prevSeleccionados) => {
            const autorExistente = prevSeleccionados.find((a) => a.id === autor.id);
            if (autorExistente) return prevSeleccionados; // Si ya está seleccionado, no hacer nada
            return [...prevSeleccionados, autor];
        });
        onAutoresChange(autoresSeleccionados); // Llamar al callback con los autores seleccionados
        setQuery(""); // Limpiar el campo de búsqueda
    };

    const autoresFiltrados = autoresDisponibles.filter(
        (autor) =>
            autor.nombre.toLowerCase().includes(query.toLowerCase()) ||
            autor.correo.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                className="form-control"
                value={query}
                onChange={handleInputChange}
                placeholder="Buscar autor"
            />
            {query && (
                <ul className="list-group">
                    {autoresFiltrados.map((autor) => (
                        <li
                            key={autor.id}
                            className="list-group-item"
                            onClick={() => handleAutorSeleccionado(autor)}
                            style={{ cursor: "pointer" }}
                        >
                            {autor.nombre} || {autor.correo}
                        </li>
                    ))}
                </ul>
            )}
            <div>
                {autoresSeleccionados.length > 0 && (
                    <div>
                        <h5>Autores seleccionados:</h5>
                        <ul>
                            {autoresSeleccionados.map((autor) => (
                                <li key={autor.id}>{autor.nombre}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuscadorAutores;
