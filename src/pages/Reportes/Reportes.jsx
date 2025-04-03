import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Logo from "../../assets/images/imgpng.png";
import ReporteCongresistas from "../../components/ReportesForms/ReporteCongresistas";
import ReporteTrabajos from "../../components/ReportesForms/ReporteTrabajos";
import ReporteSesiones from "../../components/ReportesForms/ReporteSesiones";
import ReporteChairmans from "../../components/ReportesForms/ReporteChairmans";
import ReporteDiaMasTrabajos from "../../components/ReportesForms/ReporteDiaMasTrabajos";
import ReporteAutoresNoCongresistas from "../../components/ReportesForms/ReporteAutoresNoCongresistas";
import ReporteTrabajosNoAceptados from "../../components/ReportesForms/ReporteTrabajosNoAceptados";

const Reportes = () => {
    const navigate = useNavigate();

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
                        <h2 className="pb-4 fw-bold" id="Encabezado">Generar Reportes</h2>

                        <div className="d-flex flex-column align-items-center gap-3">
                            <ReporteCongresistas />
                            <ReporteTrabajos />
                            <ReporteSesiones />
                            <ReporteChairmans />
                            <ReporteDiaMasTrabajos />
                            <ReporteAutoresNoCongresistas />
                            <ReporteTrabajosNoAceptados />
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <button
                                type="button"
                                className="btn btn-secondary fw-bold px-4"
                                onClick={() => navigate("/home")}
                            >
                                Volver
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

export default Reportes;