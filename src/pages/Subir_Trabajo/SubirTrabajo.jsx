import React, { useState, useEffect } from "react";
import Logo from "../../assets/images/imgpng.png";
import Footer from "../../components/Footer/Footer";
import "../Subir_Trabajo/style.css";
import Autores from "../../components/TrabajoForm/Autores";
import BuscadorAutores from "../../components/TrabajoForm/BuscadorAutores";
import SubirArchivo from "../../components/TrabajoForm/SubirArchivo";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const SubirTrabajo = () => {

    const [archivoError, setArchivoError] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [abstract, setAbstract] = useState("");
    const [autoresSeleccionados, setAutoresSeleccionados] = useState([]);
    const [documento, setDocumento] = useState(null);
    const [camposCompletados, setCamposCompletados] = useState(false);
    const [urlDocumento, setUrlDocumento] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const tituloValido = titulo.length >= 30 && titulo.length <= 200;
        const abstractValido = abstract.length >= 500 && abstract.length <= 2000;
        const autoresValidos = autoresSeleccionados.length > 0;
        const documentoValido = documento !== null;
        const urlDocumentoValido = urlDocumento !== null;


        setCamposCompletados(
            tituloValido && abstractValido && autoresValidos && documentoValido && urlDocumentoValido && !archivoError
        );
    }, [titulo, abstract, autoresSeleccionados, documento, urlDocumento, archivoError]);

    const handleAbstractChange = (e) => {
        setAbstract(e.target.value);
    };

    const handleDocumentChange = (e) => {
        if (e.target.files.length > 0) {
            const archivo = e.target.files[0];
            const tiposPermitidos = [
                'application/pdf', //PDF
                'application/msword', //DOC
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
                'text/plain' //TXT
            ];



            if (tiposPermitidos.includes(archivo.type)) {
                setDocumento(archivo);
                setUrlDocumento(null);
            } else {
                alert('Por favor, selecciona un archivo PDF, DOC, DOCX o TXT.');
                e.target.value = null;
                setDocumento(null);
            }
        } else {
            setDocumento(null);
        }
    };

    const handleAutoresChange = (autores) => {
        setAutoresSeleccionados(autores);
    };

    const handleArchivoSubido = (archivo) => {
        if (archivo && archivo.error) {
            console.log("Error al subir el archivo:", archivo.error);
            setUrlDocumento(null);
            setArchivoError(true); // Actualizar archivoError a true
        } else if (archivo && archivo.url) {
            setUrlDocumento(archivo.url);
            setArchivoError(false); // Actualizar archivoError a false
            console.log("URL del documento:", archivo.url);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar en el frontend: Si ningún autor es congresista, se muestra error.
        const tieneCongresista = autoresSeleccionados.some(autor => autor.esCongresista);
        console.log("Autores seleccionados:", autoresSeleccionados);

        if (!tieneCongresista) {
            Swal.fire({
                title: "Error",
                text: "Al menos uno de los autores debe ser congresista.",
                icon: "error",
                showConfirmButton: false,
                timer: 1500

            });
            return;
        }

        // Proceder con el envío del formulario
        try {
            const response = await fetch('http://localhost:5000/api/users/SubirTrabajos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo,
                    abstract,
                    autores: autoresSeleccionados,  // Se envían los objetos completos
                    urlArchivo: urlDocumento,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al subir el trabajo");
            }

            Swal.fire({
                title: "Trabajo subido",
                text: "El trabajo se ha guardado correctamente.",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });

            setTimeout(() => {
                navigate("/home");
            }, 2000);

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                showConfirmButton: false,
                timer: 2000
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    const handleCancelar = () => {
        Swal.fire({
            title: "¿Estás seguro que quieres cancelar?",
            text: "Todos los campos que se hayas llenado se perderan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "Volver a Subir Trabajo",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/home"); 
            }
        });
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

                <form onSubmit={handleSubmit}>
                    <div className="row mb-3 text-start w-100">
                        <div className="col">
                            <p className="me-1 fw-bold fs-5">Título:</p>
                        </div>
                        <div className="col-md-9 w-100">
                            <p className="text-start text-body-tertiary">
                                Mínimo de 30 y un máximo de 200 caracteres
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
                                Mínimo de 500 y un máximo de 2000 caracteres
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
                        <p className="mb-3 text-body-tertiary text-start">
                            Solo se permiten PDF, DOC, DOCS y TXT.<br></br> Tamaño máximo de archivo 100 KB.
                        </p>
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
                    {documento && (
                        <SubirArchivo archivo={documento} onArchivoSubido={handleArchivoSubido} />
                    )}
                    

                </form>

                <div className="d-flex justify-content-between">
                        <button
                            type="submit"
                            className="btn btn-primary w-25 py-2 fw-bold"
                            disabled={!camposCompletados || archivoError}
                        >
                            Guardar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-danger w-25 py-2 fw-bold"
                            onClick={handleCancelar}
                        >
                            Cancelar
                        </button>
                        
                    </div>
                
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