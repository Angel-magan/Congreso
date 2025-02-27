import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Congresista = ({ congresista, onActualizarMiembro }) => {
    const [checked, setChecked] = useState(congresista.miembro_comite === "1");

    useEffect(() => {
        setChecked(congresista.miembro_comite === "1");
    }, [congresista.miembro_comite]);

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;

        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Estás seguro de que quieres ${isChecked ? "agregar" : "quitar"} a ${congresista.nombre} ${congresista.apellido} como miembro del comité?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, estoy seguro',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                onActualizarMiembro(congresista.id_congresista, isChecked ? 1 : 0)
                    .then(() => {
                        Swal.fire({
                            title: "Miembro de Comité",
                            text: `El miembro de comité se ha ${isChecked ? "registrado en el comité" : "retirado del comité"} correctamente.`,
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch((error) => {
                        console.error("Error al actualizar el miembro:", error);
                        Swal.fire({
                            title: "Error",
                            text: "Error al actualizar el miembro:", error,
                            icon: "error",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    });
                console.log("El usuario confirmó la acción");
            } else {
                setChecked(!isChecked);
                console.log("El usuario canceló la acción");
            }
        });
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