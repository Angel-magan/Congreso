import React, { useState } from 'react';

const Buscador = ({ onFilterChange }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filterBy, setFilterBy] = useState('nombre'); // Valor inicial del filtro

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        onFilterChange(event.target.value, filterBy); // Notifica al componente padre
    };

    const handleFilterChange = (event) => {
        setFilterBy(event.target.value);
        onFilterChange(searchValue, event.target.value); // Notifica al componente padre
    };

    return (
        <div className="d-flex align-items-center mx-5">
            <select
                className="form-select me-2 w-25 border border-danger"
                value={filterBy}
                onChange={handleFilterChange}
            >
                <option value="nombre">Nombre</option>
                <option value="institucion">Institución</option>
                <option value="id_congresista">ID</option>
            </select>
            <input
                className="form-control me-2 border border-danger"
                type="search"
                placeholder="Buscar 🔍"
                aria-label="Search"
                value={searchValue}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default Buscador;