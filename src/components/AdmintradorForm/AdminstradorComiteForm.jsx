import React, { useState, useEffect } from "react";

const Congresista = ({ congresista, onActualizarMiembro }) => {
    const [checked, setChecked] = useState(congresista.miembro_comite === "1");

    useEffect(() => {
        setChecked(congresista.miembro_comite === "1");
    }, [congresista.miembro_comite]);

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;

        const confirmacion = window.confirm(
            `¿Estás seguro de que quieres ${isChecked ? "agregar" : "quitar"} a ${congresista.nombre} ${congresista.apellido} como miembro del comité?`
        );

        if (confirmacion) {
            onActualizarMiembro(congresista.id_congresista, isChecked ? 1 : 0)
                .then(() => {

                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error al actualizar el miembro:", error);

                });
        } else {

            setChecked(!isChecked);
        }
    };

    return (
        <div className="card mx-5 my-2 bordeCongresistas">
            <div className="card-body d-flex align-items-center justify-content-between">
                <div >
                    <h5 className="card-title">
                        {congresista.nombre} {congresista.apellido}
                    </h5>
                    <p className="card-text">ID Congresista: {congresista.id_congresista}</p>
                    <p className="card-text">Institución: {congresista.institucion}</p>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`miembro-${congresista.id_congresista}`}
                        checked={checked}
                        onChange={handleCheckboxChange}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`miembro-${congresista.id_congresista}`}
                    >
                        Miembro del comité
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Congresista;