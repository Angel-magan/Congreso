import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import RegisterUser from "./pages/Register/RegisterUser";
import RegisterCongressman from "./pages/Register/RegisterCongressman";
import RegisterAuthor from "./pages/Register/RegisterAuthor";
import Home from "./pages/Home/Home";
import AdminstrarComite from "./pages/Administrar_Miembros_Comite/administrarComite";
import SubirTrabajo from "./pages/Subir_Trabajo/SubirTrabajo"
import CrearSesion from "./pages/Crear_Sesion/CrearSesion";

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
      </Routes>
    </Router>
  );
}

export default App;
