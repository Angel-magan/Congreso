import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Congresista from "../../components/AdmintradorForm/AdminstradorComiteForm";
import Navbar from "../../components/Navbar/Navbar";
import "./administrarComite.css"

const AdministrarCongresistas = () => {
  const [congresistas, setCongresistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCongresistas = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:5000/api/users/congresistas");
        setCongresistas(response.data);
      } catch (error) {
        console.error("Error fetching congresistas:", error);
        setError("Error al cargar la lista de congresistas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCongresistas();
  }, []);

  const actualizarMiembro = async (idCongresista, miembroComite) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/congresistas/${idCongresista}/${miembroComite}`
      );

      if (response.status === 200) {
        setCongresistas(
          congresistas.map((c) =>
            c.id_congresista === idCongresista ? { ...c, miembro_comite: miembroComite } : c
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar miembro del comité:", error);
      alert("Error al actualizar miembro del comité.");
    }
  };

  const handleFinalizar = () => {
    navigate("/ruta/a/donde/quieras/ir");
  };

  if (loading) {
    return <div>Cargando congresistas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>

      <Navbar/>

      <section className="container p-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <h2 className="pb-5 fw-bold" id="Encabezado">Administrador de Comité</h2>
            {congresistas.length > 0 ? (
              congresistas.map((congresista) => (
                <Congresista
                  key={congresista.id_congresista}
                  congresista={congresista}
                  onActualizarMiembro={actualizarMiembro}
                />
              ))
            ) : (
              <p>No hay congresistas registrados.</p>
            )}
            <button
              type="button"
              className="btn btn-primary fw-bold px-4 mt-3"
              onClick={handleFinalizar}
            >
              Finalizar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdministrarCongresistas;