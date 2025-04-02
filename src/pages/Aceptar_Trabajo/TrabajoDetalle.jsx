import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from "../../components/Footer/Footer";
import Logo from "../../assets/images/imgpng.png";
import Swal from "sweetalert2";



const TrabajoDetalles = () => {
    const { id } = useParams();
    const [trabajo, setTrabajo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        const fetchTrabajo = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/api/users/getTrabajo/${id}`);
                setTrabajo(response.data);

            } catch (error) {
                console.error("Error fetching trabajo:", error);
                setError("Error al cargar los detalles del trabajo.");
            } finally {
                setLoading(false);
            }
        };
        fetchTrabajo();
    }, [id]);

    const handleAceptadoChange = (event) => {
        setTrabajo({ ...trabajo, trabajoAceptado: event.target.value });
    };

    const handleUpdateTrabajo = async () => {
        try {
            await axios.put(`http://localhost:5000/api/users/actualizarTrabajo/${id}/${trabajo.trabajoAceptado}`);
            

            Swal.fire({
                title: "Trabajo actualizado",
                text: "El trabajo se ha guardado correctamente.",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });

            setTimeout(() => {
                navigate("/aceptarTrabajo");
            }, 2000);

        } catch (error) {
            console.error("Error updating trabajo:", error);
            setError("Error al actualizar el trabajo.");
        }
    };

    const getFileType = (url) => {
        const urlObj = new URL(url);
        return urlObj.pathname.split('.').pop().toLowerCase();
    };

    const fileType = trabajo && trabajo.url ? getFileType(trabajo.url) : null;

    const renderFile = () => {
        if (!trabajo || !trabajo.url) return null;

        switch (fileType) {
            case 'pdf':
                return (
                    <iframe
                        src={trabajo.url}
                        width="100%"
                        height="600px"
                        style={{ border: 'none' }}
                    />
                );
            case 'doc':
            case 'docx':
                return (
                    <iframe
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(trabajo.url)}`}
                        width="100%"
                        height="600px"
                        style={{ border: 'none' }}
                    />
                )

            case 'txt':
                return (
                    <div style={{ maxHeight: '600px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>
                            <embed src={trabajo.url} width="100%" height="600px" />
                        </pre>
                    </div>
                );
            default:
                return <p>Tipo de archivo no compatible.</p>;
        }
    };

    if (loading) return <div className="text-center p-5">Cargando detalles del trabajo...</div>;
    if (error) return <div className="text-center p-5 text-danger">{error}</div>;
    if (!trabajo) return <div className="text-center p-5">Trabajo no encontrado.</div>;

    const handleCancelar = () => {
        Swal.fire({
            title: "¿Estás seguro que quieres cancelar?",
            text: "Todos los campos que se hayas llenado se perderan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, cancelar",
            cancelButtonText: "Volver a los detalles del trabajo",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/aceptarTrabajo");
            }
        });
    };

    return (
        <div className="fondo">
            <img
                src={Logo}
                className="img-fluid"
                alt="Logo"
                style={{ width: "200px" }}
            />
            <section className="container py-5 my-5">
                <h2 className='fw-bold fs-1 text-center pb-3'>Aprobación de Trabajo</h2>
                <p className='text-center fs-4 '><strong>Título: </strong> {trabajo.titulo}</p>
                <p className='pb-3'><strong>Abstract: </strong> {trabajo.abstract}</p>
                {renderFile()}

                <div className="form-group py-3 text-center">
                    <label className='fw-bold py-3'>Estado de Trabajo:</label>
                    <div className='d-flex justify-content-center align-items-center'>

                        <select className="form-control w-25" value={trabajo.trabajoAceptado} onChange={handleAceptadoChange}>
                            <option value="1">Aprobado</option>
                            <option value="0">Rechazado</option>
                        </select>
                    </div>

                </div>

                <div className='d-flex justify-content-center mt-4 '>
                    <div className='d-flex gap-4'>
                        <button className="btn btn-primary w-75 py-2 fw-bold" onClick={handleUpdateTrabajo}>
                            Actualizar Trabajo
                        </button>
                        <button className="btn btn-danger w-75 py-2 fw-bold" onClick={handleCancelar}>
                            Cancelar
                        </button>
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

export default TrabajoDetalles;
