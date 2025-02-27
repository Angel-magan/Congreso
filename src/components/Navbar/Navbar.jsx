import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/imgpng.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro que quieres cerrar sesión?",
      text: "Se cerrará la sesión y volverás al login.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user"); // Elimina la sesión
        navigate("/"); // Redirige al login
      }
    });
  };

  return (
    <section className="sticky-top">
      <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Logo" style={{ height: "50px" }} />
          </Link>

          {/* Botón Hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido del Navbar */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="d-flex align-items-center ms-auto justify-content-center gap-2">
              <Link
                to="/home"
                className="btn text-light fs-3 bg-btn-navbar"
              >
                <i className="bi bi-house-fill"></i>
              </Link>
              <Link to="" className="btn text-light fs-3 bg-btn-navbar">
                <i className="bi bi-person-fill"></i>
              </Link>
              <Link
                to="#"
                className="btn text-danger fs-3 bg-btn-navbar"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;