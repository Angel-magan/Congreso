import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/imgpng.png";
import Footer from "../../components/Footer/Footer";
import "../Subir_Trabajo/style.css";
import Autores from "../../components/TrabajoForm/Autores";

const SubirTrabajo = () => {
    
    const [titulo, setTitulo] = useState("");
    const [abstract, setAbstract] = useState("");
    const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
    const [documento, setDocumento] = useState(null);
    const [camposCompletados, setCamposCompletados] = useState(false);

    useEffect(() => {
        const tituloValido = titulo.length >= 50 && titulo.length <= 200;
        const abstractValido = abstract.length >= 900 && abstract.length <= 2000;
        const autoresValidos = autoresSeleccionados.length > 0;
        const documentoValido = documento !== null;

        setCamposCompletados(
            tituloValido && abstractValido && autoresValidos && documentoValido
        );
    }, [titulo, abstract, autoresSeleccionados, documento]);

    const handleAbstractChange = (e) => {
        setAbstract(e.target.value);
    };

    const handleDocumentChange = (e) => {
        if (e.target.files.length > 0) {
            setDocumento(e.target.files[0]);
        } else {
            setDocumento(null); 
        }
    };

    const handleAutoresChange = (autores) => {
        setAutoresSeleccionados(autores);
    };

    return (
        <div className="fondo d-block justify-content-center align-items-center min-vh-100">
            <img
                src={Logo}
                className="img-fluid"
                alt="Logo"
                style={{ width: "200px" }}
            />

            <div
                className="container p-5 bg-white text-center"
                style={{ maxWidth: "700px" }}
            >
                <h1 className="fw-bold mb-4">¡Sube tu trabajo!</h1>

                <form>
                    <div className="row mb-3 text-start w-100">
                        <div className="col">
                            <p className="me-1 fw-bold fs-5">Título:</p>
                        </div>
                        <div className="col-md-9 w-100">
                            <p className="text-start text-body-tertiary">
                                Mínimo de 50 y un máximo de 200 caracteres
                            </p>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese el título aquí"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 text-start w-100">
                        <div className="col">
                            <p className="me-1 fw-bold fs-5">Abstract:</p>
                        </div>
                        <div className="col-9 w-100">
                            <p className="text-start text-body-tertiary">
                                Mínimo de 900 y un máximo de 2000 caracteres
                            </p>
                            <textarea
                                className="form-control tamanioTextArea"
                                placeholder="Escribe tu abstract aquí"
                                id="floatingTextarea2"
                                value={abstract}
                                onChange={handleAbstractChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className="row mb-3 text-start w-100">
                        <div className="col w-25">
                            <p className="me-1 fw-bold fs-5">Autores:</p>
                        </div>
                        <div className="col-md-9 input-group w-100">
                            <Autores onAutoresChange={handleAutoresChange} />
                        </div>
                    </div>

                    <div className="row mb-3 text-start w-100">
                        <div className="col">
                            <p className="me-1 fw-bold fs-5">Documento:</p>
                        </div>
                        <div className="col-9 w-100">
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    onChange={handleDocumentChange}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-50 py-2 fw-bold"
                        disabled={!camposCompletados}
                    >
                        Guardar
                    </button>
                </form>
            </div>
            <div className="trianguloo"></div>
            <div className="circulo"></div>
            <div className="cuadrado"></div>
            <div className="sticky-bottom">
                <Footer />
            </div>
        </div>
    );
};

export default SubirTrabajo;