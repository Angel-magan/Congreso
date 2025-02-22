import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/images/imgpng.png";;

function Navbar() {

    return (
        <div>
            {/* NavBar */}
            <section className="sticky-top">
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container">
                        <div className="d-flex w-100 align-items-center justify-content-between">
                            {/* Logo */}
                            <Link className="navbar-brand" to="/">
                                <img src={Logo} alt="Logo" style={{ height: '65px' }} />
                            </Link>
                            {/* Elementos */}
                            <div className="d-flex align-items-center">
                                <Link to="/voluntario" className="btn text-light m-2 fs-3 bg-btn-navbar">
                                    <i className="bi bi-house-fill"></i>
                                </Link>
                                <Link to="/donar" className="btn text-light m-1 fs-3 bg-btn-navbar">
                                    <i className="bi bi-person-fill"></i>
                                </Link>
                                <Link to="/donar" className="btn text-danger m-1 fs-3 bg-btn-navbar">
                                    <i className="bi bi-box-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
        </div>
    );
}

export default Navbar;