import React, { useEffect, useState } from "react";
import axios from "axios";

const TrabajoCard = ({ titulo, fecha_hora, sala, chairman, ponente }) => {
  const fecha = new Date(fecha_hora); // Convierte a fecha para mostrarla correctamente
  const formattedFecha = `${fecha.toLocaleDateString()}`;
  const formattedHora = `${fecha.toLocaleTimeString()}`;

  return (
    <div className="border border-3 border-warning rounded p-3 trabajo-card d-flex flex-column">
      <h5 className="fw-bold">{titulo}</h5>
      <div className="d-flex align-items-center text-muted">
        <i className="bi bi-calendar-event me-2"></i> {formattedFecha}
        <i className="bi bi-clock ms-3 me-2"></i> {formattedHora}
      </div>
      <p className="mt-2">
        <strong>Sala:</strong> {sala}
      </p>
      <p>
        <i className="bi bi-mic-fill text-primary"></i>{" "}
        <strong>Chairman:</strong> {chairman}
      </p>
      <p>
        <i className="bi bi-megaphone-fill text-danger"></i>{" "}
        <strong>Ponente:</strong> {ponente}
      </p>
      {/*<p>
        <i className="bi bi-check text-success"></i>{" "}
        <strong className="text-success">Asistido</strong>
      </p>*/}
    </div>
  );
};

const MisAsistencias = () => {
  const [trabajos, setTrabajos] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const roles = user && user.roles ? user.roles : [];

  const isCongresista = roles.includes("Congresista");
  const isAutor = roles.includes("Autor");

  const [congresistaData, setCongresistaData] = useState(null); // Datos del congresista
  const [loading, setLoading] = useState(true); // Estado de carga
  //const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    // Si el usuario es congresista, obtener sus datos
    if (isCongresista && !congresistaData) {
      // Realizar la solicitud para obtener los datos del congresista usando el ID del usuario
      axios
        .get(
          `http://localhost:5000/api/congresistas/congressmanInfo/${user.id}`
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
      //setLoading(false);
    }
  }, [isCongresista, congresistaData]);

  useEffect(() => {
    if (!congresistaData) return;

    console.log("Datos del congresista:", congresistaData);

    const fetchTrabajos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sesiones/getAsistenciaPorUsuario/${congresistaData.id_congresista}`
        );

        setTrabajos(response.data);
      } catch (error) {
        console.error("Error al obtener las sesiones:", error);
      }
    };

    fetchTrabajos();
  }, [congresistaData]);

  // Si no hay usuario, muestra un mensaje de error
  if (!user) {
    return <p>No hay usuario autenticado.</p>;
  }

  return (
    <div
      className="row mt-3"
      style={{
        maxHeight: "700px",
        overflowY: "auto",
        border: "3px solid #00BFFF",
        borderRadius: "10px",
        padding: "15px",
      }}
    >
      {trabajos.length > 0 ? (
        trabajos.map((trabajo, index) => (
          <div key={index} className="col-md-6 mb-3">
            <TrabajoCard {...trabajo} />
          </div>
        ))
      ) : (
        <p>Aún no estás participando en ninguna sesión.</p>
      )}
    </div>
  );
};

export default MisAsistencias ;
