import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link

const Trabajo = ({ trabajo }) => {
    const estadoTrabajo = (trabajoAceptado) => {
        if (trabajoAceptado === null || trabajoAceptado === '0') {
            return "Rechazado ❌";
        } else if (trabajoAceptado === '1') {
            return "Aprobado ✅";
        } else {
            return "Estado Desconocido"; // Manejar otros casos
        }
    };
    return (
        <Link to={`/trabajo/${trabajo.id}`} className="card mx-5 my-2 bordeTrabajo text-decoration-none text-dark">
           
            <div className="card-body">
                <h5 className="card-title fw-bold">
                    {trabajo.titulo}
                </h5>
                <p className="card-text">Abstract: {trabajo.abstract}</p>
                <p className="card-text">Estado: {estadoTrabajo(trabajo.trabajoAceptado)}</p>

            </div>
        </Link>
    );
};

export default Trabajo;