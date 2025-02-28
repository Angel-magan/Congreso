import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Congresista from "../../components/AdmintradorForm/AdminstradorComiteForm";
import Navbar from "../../components/Navbar/Navbar";
import "./style.css";
import Buscador from "../../components/AdmintradorForm/Buscador";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import Logo from "../../assets/images/imgpng.png";

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
      Swal.fire({
        title: "Error",
        text: "Error al actualizar miembro del comité.",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleFinalizar = () => {
    navigate("/home");
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
    return <div className="text-center p-5">Cargando congresistas...</div>;
  }

  if (error) {
    return <div className="text-center p-5 text-danger">{error}</div>;
  }

  return (
    <div className="fondo">
      <img
        src={Logo}
        className="img-fluid"
        alt="Logo"
        style={{ width: "200px" }}
      />
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="text-center">
            <h2 className="pb-4 fw-bold" id="Encabezado">Administración de Comité</h2>

            <div
              id="bordeAzul"
              className="row my-3 mx-1 p-3 border border-primary border-2 rounded shadow-sm"
            >
              {/* Sección de Filtro y Buscador */}
              <div className="col-12 col-md-4 p-2">
                <h3 id="bordeAzulCongresistas" className="py-2 text-center text-md-start">
                  Congresistas
                </h3>
              </div>
              <div className="col-12 col-md-8">
                <Buscador onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* Lista de Congresistas */}
            <div className="mt-3">
              {filteredCongresistas.length > 0 ? (
                filteredCongresistas.map((congresista) => (
                  <Congresista
                    key={congresista.id_congresista}
                    congresista={congresista}
                    onActualizarMiembro={actualizarMiembro}
                  />
                ))
              ) : (
                <p className="text-muted">No hay congresistas registrados.</p>
              )}
            </div>

            {/* Botón Finalizar */}
            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                className="btn btn-primary fw-bold px-4"
                onClick={handleFinalizar}
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="trianguloo"></div>
      <div className="circulo"></div>
      <div className="cuadrado"></div>
      <Footer />
    </div>
  );
};

export default AdministrarCongresistas;
