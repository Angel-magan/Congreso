import { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de tener importado axios
import { data } from "react-router-dom";
//import "bootstrap-icons/font/bootstrap-icons.css"; // Asegúrate de tener Bootstrap Icons

export default function MisDatos() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User en MisDatos:", user); // Añadido para depuración
  const roles = user && user.roles ? user.roles : [];
  console.log("Roles del usuario:", roles);

  const isCongresista = roles.includes("Congresista");
  const isAutor = roles.includes("Autor");
  //const isNormal = !isCongresista && !isAutor;
  //const isAmbos = isCongresista && isAutor;
  //const isComite = roles.includes("miembro_comite");

  const [congresistaData, setCongresistaData] = useState(null); // Datos del congresista
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    // Si el usuario es congresista, obtener sus datos
    if (isCongresista && !congresistaData) {
      // Realizar la solicitud para obtener los datos del congresista usando el ID del usuario
      axios
        .get(
          `http://localhost:5000/api/congresistas/congressmanInfo/${user.id || user.id_usuario}`
        )
        .then((response) => {
          setCongresistaData(response.data); // Guardar los datos en el estado
          setLoading(false); // Cambiar el estado de carga a false
        })
        .catch((err) => {
          setError("Error al cargar la información del congresista.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isCongresista, congresistaData]);

  // Si no hay usuario, muestra un mensaje de error
  if (!user) {
    return <p>No hay usuario autenticado.</p>;
  }

  // Si los datos están cargando, muestra el mensaje de carga
  if (loading) {
    return <p>Cargando datos...</p>;
  }

  // Si ocurre un error, muestra el mensaje de error
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className="container mt-4"
      style={{
        border: "3px solid #00BFFF",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      {/* Encabezado con título y ID */}
      <div
        className="d-flex justify-content-between border-bottom pb-2"
        style={{
          border: "1px solid #00BFFF",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <h5 className="fw-bold">Mis datos</h5>
        <h5 className="text-end">
          {isCongresista
            ? `ID Congresista: ${congresistaData.id_congresista}`
            : ""}
        </h5>
      </div>

      {/* Tarjeta de información */}
      <div
        className="border border-1 border-warning rounded p-3 mt-3"
        style={{ borderColor: "#FDD73C", borderWidth: "2px" }} // Borde amarillo y grosor de 2px
      >
        <p>
          <strong>Nombre:</strong>{" "}
          {user ? `${user.nombre}  ${user.apellido}` : ""}
        </p>
        <p>
          <strong>Correo:</strong> {user ? `${user.correo}` : ""}
        </p>
        {isCongresista && (
          <>
            {congresistaData.institucion && (
              <p>
                <strong>Institución:</strong> {congresistaData.institucion}
              </p>
            )}
            {congresistaData.telefono && (
              <p>
                <strong>Teléfono:</strong> {congresistaData.telefono}
              </p>
            )}
            <p>
              <strong>Miembro del comité:</strong>{" "}
              {congresistaData.miembro_comite === "1" ? "Sí" : "No"}
            </p>
            <p>
              <strong>Fecha de registro:</strong>{" "}
              {new Date(congresistaData.fecha_registro).toLocaleDateString()}
            </p>
          </>
        )}

        {/* Botón de edición */}
        <div className="text-end">
          {/*<button className="btn" style={{ color: "#AB1918" }}>
            <i className="bi bi-pencil-square fs-4"></i>
          </button>
          */}
        </div>
      </div>
    </div>
  );
}
