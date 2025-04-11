import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Trabajo from "../../components/TrabajoForm/Trabajo";
import Navbar from "../../components/Navbar/Navbar";
import Buscador from "../../components/TrabajoForm/BuscadorTrabajos";
import Footer from "../../components/Footer/Footer";
import Logo from "../../assets/images/imgpng.png";

const AdministrarTrabajos = () => {
    const [trabajos, setTrabajos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [filteredTrabajos, setFilteredTrabajos] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [filterBy, setFilterBy] = useState("titulo");

    useEffect(() => {
        const fetchTrabajos = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("http://localhost:5000/api/users/trabajos");
                setTrabajos(response.data);
            } catch (error) {
                console.error("Error fetching trabajos:", error);
                setError("Error al cargar la lista de trabajos.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrabajos();
    }, []);

    useEffect(() => {
        setFilteredTrabajos(trabajos);
    }, [trabajos]);

    const handleFilterChange = (value, by) => {
        setFilterValue(value);
        setFilterBy(by);
        const filtered = trabajos.filter((trabajo) => {
            if (by === "titulo") {
                return trabajo.titulo.toLowerCase().includes(value.toLowerCase());
            } else if (by === "abstract") {
                return trabajo.abstract.toLowerCase().includes(value.toLowerCase());
            }
            return true;
        });
        setFilteredTrabajos(filtered);
    };

    if (loading) {
        return <div className="text-center p-5">Cargando trabajos...</div>;
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
                        <h2 className="pb-4 fw-bold" id="Encabezado">Aprobación de Trabajos</h2>

                        <div
                            id="bordeAzul"
                            className="row my-3 mx-1 p-3 border border-primary border-2 rounded shadow-sm"
                        >
                            <div className="col-12 col-md-4 p-2">
                                <h3 id="bordeAzulTrabajos" className="py-2 text-center text-md-start">
                                    Trabajos
                                </h3>
                            </div>
                            <div className="col-12 col-md-8">
                                <Buscador onFilterChange={handleFilterChange} />
                            </div>
                        </div>

                        <div className="mt-3" style={{ maxHeight: 400, overflowY: 'auto' }}>
                            {filteredTrabajos.length > 0 ? (
                                filteredTrabajos.map((trabajo) => (
                                    <Trabajo key={trabajo.id} trabajo={trabajo} />
                                ))
                            ) : (
                                <p className="text-muted">No hay trabajos registrados.</p>
                            )}
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <button
                                type="button"
                                className="btn btn-primary fw-bold px-4"
                                onClick={() => navigate("/home")}
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
            <div className="w-100">

                <Footer />
            </div>
        </div>
    );
};

export default AdministrarTrabajos;