import { useState } from "react";

import "./style.css";
import Logo from "../../assets/images/imgpng.png";
import CongressForInstitution from "../../components/Grafica/CongressForInstitution";
import TopTenAutores from "../../components/Grafica/TopTenAutores";
import DistribucionTrabajosSesion from "../../components/Grafica/DistribucionSesiones";
import UsoSalasCongreso from "../../components/Grafica/UsoSalasActivas";
import RelacionesCongresistas from "../../components/Grafica/RelacionesCongresistas";
import EvolucionInscripciones from "../../components/Grafica/EvolucionInscripciones";
import EstadoTrabajos from "../../components/Grafica/EstadoTrabajos";
import NotificacionesCongreso from "../../components/Grafica/NotificacionesCongreso";
import CongresistasTrabajos from "../../components/Grafica/CongresistasTrabajos";
import Footer from "../../components/Footer/Footer";

const MenuGraficas = () => {
  const [selectedGraph, setSelectedGraph] = useState(null);

  const renderGraph = () => {
    switch (selectedGraph) {
      case "congressForInstitution":
        return <CongressForInstitution />;
      case "topTenAutores":
        return <TopTenAutores />;
      case "distribucionSesiones":
        return <DistribucionTrabajosSesion />;
      case "usoSalasActivas":
        return <UsoSalasCongreso />;
      case "relacionesCongresistas":
        return <RelacionesCongresistas />;
      case "evolucionInscripciones":
        return <EvolucionInscripciones />;
      case "estadoTrabajos":
        return <EstadoTrabajos />;
      case "notificaciones":
        return <NotificacionesCongreso />;
      case "trabajosCongresistas":
        return <CongresistasTrabajos />;
      default:
        return null;
    }
  };

  return (
    <div className="fondo">
      <img
        src={Logo}
        className="img-fluid logo"
        alt="Logo"
        style={{ width: "200px" }}
      />
      {/* Figuras decorativas */}
      <div className="cuadrado"></div>
      <div className="trianguloo"></div>
      <div className="circulo"></div>

      {/* Botones para navegar */}
      
      <h2 className="pb-4 fw-bold" id="Encabezado">Generar Gráficas</h2>
      <div className="buttons-container">
        <button
          onClick={() => setSelectedGraph("congressForInstitution")}
          className="btn btn-primary"
        >
          Ver Congress For Institution
        </button>
        <button
          onClick={() => setSelectedGraph("topTenAutores")}
          className="btn btn-primary"
        >
          Top 10 Autores mas trabajos
        </button>
        <button
          onClick={() => setSelectedGraph("distribucionSesiones")}
          className="btn btn-primary"
        >
          Distribucion sesiones
        </button>
        <button
          onClick={() => setSelectedGraph("usoSalasActivas")}
          className="btn btn-primary"
        >
          Uso salas congreso
        </button>
        <button
          onClick={() => setSelectedGraph("relacionesCongresistas")}
          className="btn btn-primary"
        >
          Relacion congresistas
        </button>
        <button
          onClick={() => setSelectedGraph("evolucionInscripciones")}
          className="btn btn-primary"
        >
          Evolucion inscripciones
        </button>
        <button
          onClick={() => setSelectedGraph("estadoTrabajos")}
          className="btn btn-primary"
        >
          Estado trabajos
        </button>
        <button
          onClick={() => setSelectedGraph("notificaciones")}
          className="btn btn-primary"
        >
          Notificaciones
        </button>
        <button
          onClick={() => setSelectedGraph("trabajosCongresistas")}
          className="btn btn-primary"
        >
          Trabajos congresistas
        </button>
        {/* Agrega más botones aquí si es necesario */}
      </div>

      {/* Renderiza la gráfica seleccionada */}
      <div className="graph-container w-75">{renderGraph()}</div>

      <div className="sticky-bottom w-100 mb-0">
        <Footer />
      </div>
    </div>
  );
};

export default MenuGraficas;
