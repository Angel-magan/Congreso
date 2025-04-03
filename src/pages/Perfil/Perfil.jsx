import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Misdatos from "../Perfil/mis_datos";
import MisTrabajos from "../Perfil/mis_trabajos";
import MisSesiones from "../Perfil/mis_sesiones";
import MisAsistencias from "./mis_asistencias";
import { useState, useEffect, useContext } from "react";
import "./style.css";

const Perfil = () => {
  const [activeTab, setActiveTab] = useState("mis_datos");
  const [subTab, setSubTab] = useState("ponente");
  const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;

  //const roles = user && user.roles ? user.roles : [];
  const roles = user?.roles || [];

  console.log("Roles del usuario:", roles);

  const isCongresista = roles.includes("Congresista");
  const isAutor = roles.includes("Autor");
  //const isNormal = !isCongresista && !isAutor;
  //const isAmbos = isCongresista && isAutor;
  //const isComite = roles.includes("miembro_comite");

  if (!user) {
    return <p>No hay usuario autenticado.</p>;
  }
  //const { user, setUser } = useContext(AuthContext);
  //const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container mt-4 ">
        <h2 className="mb-3 text-center">
          {user
            ? `¡Es un gusto tenerte aquí ${user.nombre} ${user.apellido}!`
            : "Usario X"}
        </h2>
        <br />
        {/* Pestañas principales */}
        <ul className="nav nav-tabs custom-nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "mis_datos" ? "active" : ""
              }`}
              onClick={() => setActiveTab("mis_datos")}
            >
              Mis datos
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "mis_trabajos" ? "active" : ""
              }`}
              onClick={() => setActiveTab("mis_trabajos")}
            >
              Mis Trabajos
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "mis_asistencias" ? "active" : ""
              }`}
              onClick={() => setActiveTab("mis_asistencias")}
            >
              Asistencias
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "mis_sesiones" ? "active" : ""
              }`}
              onClick={() => setActiveTab("mis_sesiones")}
            >
              Mis Sesiones
            </button>
          </li>
        </ul>

        {/* Contenido de cada pestaña principal */}
        <div className="mt-3 tab-container" style={{ paddingBottom: "200px" }}>
          {activeTab === "mis_datos" && <Misdatos />}
          {activeTab === "mis_trabajos" && <MisTrabajos />}
          {activeTab === "mis_asistencias" && <MisAsistencias/>}

          {activeTab === "mis_sesiones" && (
            <div>
              {/* Subpestañas dentro de "Mis Sesiones" */}
              <ul className="nav nav-pills mt-3 custom-sub-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      subTab === "ponente" ? "active" : ""
                    }`}
                    onClick={() => setSubTab("ponente")}
                  >
                    Ponente
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      subTab === "chairman" ? "active" : ""
                    }`}
                    onClick={() => setSubTab("chairman")}
                  >
                    Chairman
                  </button>
                </li>
              </ul>

              {/* Contenido de las subpestañas */}
              <div className="mt-3">
                <MisSesiones rol={subTab} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed-bottom ">
        <Footer />
      </div>
    </div>
  );
};
export default Perfil;
