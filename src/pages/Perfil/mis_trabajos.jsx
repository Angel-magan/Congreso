import { useState, useEffect } from "react";
import axios from "axios";

export default function mis_trabajos() {
  
  const user = JSON.parse(localStorage.getItem("user"));

  const roles = user && user.roles ? user.roles : [];
  console.log("Roles del usuario:", roles);

  const isAutor = roles.includes("Autor");


  const [trabajos, setTrabajos] = useState([]);
  
  const [autorData, setAutorData] = useState(null); // Datos del 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener datos del autor primero
  useEffect(() => {
    if (isAutor && !autorData) {
      axios
        .get(`http://localhost:5000/api/congresistas/getInfoAuthor/${user.id}`)
        .then((response) => {
          setAutorData(response.data);
        })
        .catch(() => {
          setError("Error al cargar la información del autor.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isAutor, autorData, user.id]);

  // Obtener los trabajos del autor solo si autorData está disponible
  useEffect(() => {
    if (autorData) {
      console.log("ID DE AUTOR:"+autorData.id_autor);

      axios.get(`http://localhost:5000/api/users/getTrabajosPorAutor/${autorData.id_autor}`)

        .then((response) => {
          setTrabajos(response.data);
        })
        .catch(() => {
          setError("Hubo un error al obtener los trabajos.");
        });
    }
  }, [autorData]);

  //if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <p>No hay usuario autenticado.</p>;

  

  if (error) {
    return <div>{error}</div>;
  }


  
 return (
  <div className="container mt-4" style={{ border: "3px solid #00BFFF", borderRadius: "8px", padding: "20px" }}>
      {/* Encabezado */}
      <div className="border-bottom pb-2">
        <h5 className="fw-bold">Mis trabajos</h5>
      </div>

      {/* Lista de trabajos con SCROLL */}
      <div className="mt-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
        {trabajos.length > 0 ? (
          trabajos.map((trabajo, index) => (
            <div
              key={index}
              className="d-flex align-items-center border border-2 border-warning rounded p-2 mb-2"
              
            >
              <i className="bi bi-book fs-5 me-2"></i>
              <span className="fw-bold">{trabajo.titulo}</span>
            </div>
          ))
        ) : (
          <p>No tienes trabajos registrados.</p>
        )}
      </div>
    </div>
  );
}
