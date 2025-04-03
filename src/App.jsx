import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Importa el AuthProvider

import LoginPage from "./pages/Login/LoginPage";
import RegisterUser from "./pages/Register/RegisterUser";
import RegisterCongressman from "./pages/Register/RegisterCongressman";
import RegisterAuthor from "./pages/Register/RegisterAuthor";
import Home from "./pages/Home/Home";
import AdminstrarComite from "./pages/Administrar_Miembros_Comite/administrarComite";
import SubirTrabajo from "./pages/Subir_Trabajo/SubirTrabajo";
import CrearSesion from "./pages/Crear_Sesion/CrearSesion";
import CongressForInstitution from "./components/Grafica/CongressForInstitution";
import TopTenAutores from "./components/Grafica/TopTenAutores";
import DistribucionTrabajosSesion from "./components/Grafica/DistribucionSesiones";
import UsoSalasCongreso from "./components/Grafica/UsoSalasActivas";
import RelacionesCongresistas from "./components/Grafica/RelacionesCongresistas";
import EvolucionInscripciones from "./components/Grafica/EvolucionInscripciones";
import EstadoTrabajos from "./components/Grafica/EstadoTrabajos";
import NotificacionesCongreso from "./components/Grafica/NotificacionesCongreso";
import CongresistasTrabajos from "./components/Grafica/CongresistasTrabajos";
import MenuGraficas from "./pages/Graficas/MenuGraficas";

import AceptarTrabajo from "./pages/Aceptar_Trabajo/AceptarTrabajo";
import TrabajoDetalle from "./pages/Aceptar_Trabajo/TrabajoDetalle";
import Perfil from "./pages/Perfil/Perfil";
import Reportes from "./pages/Reportes/Reportes";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/registerUser" element={<RegisterUser />} />
        <Route path="/registerCongressman" element={<RegisterCongressman />} />
        <Route path="/registerAuthor" element={<RegisterAuthor />} />
        <Route path="/home" element={<Home />} />
        <Route path="/administrarComite" element={<AdminstrarComite />} />
        <Route path="/subirTrabajo" element={<SubirTrabajo />} />
        <Route path="/crearSesion" element={<CrearSesion />} />
        <Route path="/menuGraficas" element={<MenuGraficas />} />
        <Route
          path="/congressForInstitution"
          element={<CongressForInstitution />}
        />
        <Route path="/topTenAutores" element={<TopTenAutores />} />
        <Route
          path="/distribucionSesiones"
          element={<DistribucionTrabajosSesion />}
        />
        <Route path="/usoSalasActivas" element={<UsoSalasCongreso />} />
        <Route
          path="/relacionesCongresistas"
          element={<RelacionesCongresistas />}
        />
        <Route
          path="/evolucionInscripciones"
          element={<EvolucionInscripciones />}
        />
        <Route path="/estadoTrabajos" element={<EstadoTrabajos />} />
        <Route path="/notificaciones" element={<NotificacionesCongreso />} />
        <Route
          path="/trabajosCongresistas"
          element={<CongresistasTrabajos />}
        />
        <Route path="/aceptarTrabajo" element={<AceptarTrabajo />} />
        <Route path="/trabajo/:id" element={<TrabajoDetalle />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/reportes" element={<Reportes />} />
      </Routes>
    </Router>
  );
}

export default App;
