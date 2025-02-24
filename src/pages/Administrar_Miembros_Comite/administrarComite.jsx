import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Congresista from "../../components/AdmintradorForm/AdminstradorComiteForm";
import Navbar from "../../components/Navbar/Navbar";
import "./style.css";
import Buscador from "../../components/AdmintradorForm/Buscador";
import Footer from "../../components/Footer/Footer";

const AdministrarCongresistas = () => {
  const [congresistas, setCongresistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [filteredCongresistas, setFilteredCongresistas] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterBy, setFilterBy] = useState("nombre");

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

  useEffect(() => {
    setFilteredCongresistas(congresistas);
  }, [congresistas]);

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

  const handleFilterChange = (value, by) => {
    setFilterValue(value);
    setFilterBy(by);
    const filtered = congresistas.filter((congresista) => {
      if (by === "nombre") {
        return congresista.nombre.toLowerCase().includes(value.toLowerCase());
      } else if (by === "institucion") {
        return congresista.institucion.toLowerCase().includes(value.toLowerCase());
      } else if (by === "id_congresista") {
        return String(congresista.id_congresista).includes(value);
      }
      return true;
    });
    setFilteredCongresistas(filtered);
  };

  if (loading) {
    return <div>Cargando congresistas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="sticky-top">
        <Navbar />
      </div>

      <section className="container p-5">
        <div className="row justify-content-center">
          <div className="text-center">
            <h2 className="pb-5 fw-bold" id="Encabezado">Administración de Comité</h2>
            <div id="bordeAzul" className="row my-3">
              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
                <div className="col-md-4 p-4">
                  <h3 id="bordeAzulCongresistas" className="TamanioCongresista py-3 mx-4 text-start">Congresistas</h3>
                </div>
                <div className="col-md-7">
                  <Buscador onFilterChange={handleFilterChange} />
                </div>
              </div>
              <div className="mt-2 mb-4">
                {filteredCongresistas.length > 0 ? (
                  filteredCongresistas.map((congresista) => (
                    <Congresista
                      key={congresista.id_congresista}
                      congresista={congresista}
                      onActualizarMiembro={actualizarMiembro}
                    />
                  ))
                ) : (
                  <p>No hay congresistas registrados.</p>
                )}
              </div>
            </div>

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

      <Footer />

    </div>
  );
};

export default AdministrarCongresistas;