import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/imgpng.png";

function Navbar() {
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
                to="/voluntario"
                className="btn text-light fs-3 bg-btn-navbar"
              >
                <i className="bi bi-house-fill"></i>
              </Link>
              <Link to="/donar" className="btn text-light fs-3 bg-btn-navbar">
                <i className="bi bi-person-fill"></i>
              </Link>
              <Link to="/" className="btn text-danger fs-3 bg-btn-navbar">
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
