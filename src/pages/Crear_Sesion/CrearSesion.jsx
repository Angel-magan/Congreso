import { useEffect, useState } from "react";
import axios from "axios";

import CrearSesionForm from "../../components/CrearSesionForm/CrearSesionForm";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "../Administrar_Miembros_Comite/style.css";

const CrearSesion = () => {
	const [titulo, setTitulo] = useState("");
	const [trabajos, setTrabajos] = useState([]);
	const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
	const [fecha, setFecha] = useState("");
	const [hora, setHora] = useState("");
	const [sala, setSala] = useState("");
	const [idTrabajoSeleccionado, setIdTrabajoSeleccionado] = useState(null);
	const [autoresCongresistas, setAutoresCongresistas] = useState([]);
	const [mostrarListaTrabajos, setMostrarListaTrabajos] = useState(false);
	const [mostrarListaMiembros, setMostrarListaMiembros] = useState(false);
	const [mensajeAutores, setMensajeAutores] = useState("");
	const [terminoBusquedaChairman, setTerminoBusquedaChairman] = useState("");
	const [miembrosComite, setMiembrosComite] = useState([]);
	const [chairmanSeleccionado, setChairmanSeleccionado] = useState(null);
	const [miembrosFiltrados, setMiembrosFiltrados] = useState([]);

	useEffect(() => {
		const obtenerMiembrosComite = async () => {
			try {
				const response = await axios.get(
					"http://localhost:5000/api/users/miembros-comite"
				);
				setMiembrosComite(response.data);
				setMiembrosFiltrados(response.data); // Inicialmente, mostrar todos
			} catch (error) {
				console.error("Error al obtener miembros del comité:", error);
			}
		};
		obtenerMiembrosComite();
	}, []);

	const buscarTrabajos = async (titulo) => {
		setTitulo(titulo);
		setTrabajoSeleccionado(null);

		if (titulo.length > 2) {
			// Buscar solo si el usuario escribe más de 2 caracteres
			try {
				const response = await axios.get(
					`http://localhost:5000/api/users/buscar?titulo=${titulo}`
				);
				setTrabajos(response.data);
				setMostrarListaTrabajos(true);
			} catch (error) {
				console.error("Error al buscar trabajos:", error);
				setMostrarListaTrabajos(false);
			}
		} else {
			setTrabajos([]);
		}
	};

	const seleccionarTrabajo = async (trabajo) => {
		setTitulo(trabajo.titulo);
		setIdTrabajoSeleccionado(trabajo.id_trabajo);
		setTrabajos([]); // Ocultar la lista después de seleccionar
		setMostrarListaTrabajos(false);

		try {
			const response = await axios.get(
				`http://localhost:5000/api/users/${trabajo.id_trabajo}/autores`
			);
			setAutoresCongresistas(response.data);
			if (response.data.length === 0) {
				setMensajeAutores(
					"No se encontraron autores congresistas para este trabajo."
				);
			} else {
				setMensajeAutores("");
			}
		} catch (error) {
			console.error("Error al obtener autores congresistas:", error);
			setAutoresCongresistas([]);
			setMensajeAutores("Error al obtener autores congresistas.");
		}
	};

	const buscarMiembrosComite = (nombre) => {
		setTerminoBusquedaChairman(nombre);
		if (nombre.trim() === "") {
			setMiembrosFiltrados(miembrosComite); // Si no hay búsqueda, mostrar todos
		} else {
			const filtrados = miembrosComite.filter((miembro) =>
				miembro.nombre.toLowerCase().includes(nombre.toLowerCase())
			);
			setMiembrosFiltrados(filtrados);
		}
	};

	const seleccionarChairman = (miembro) => {
		setChairmanSeleccionado(miembro);
		setTerminoBusquedaChairman(miembro.nombre);
	};

	// se usará cuando se cree el guardarSesion
	const fechaHora = `${fecha} ${hora}:00`;

	return (
		<>
			<Navbar />
			<div className="mt-5 m-auto">
				<h2 className="mb-sm-5 text-center">Creación de Sesión</h2>

				<section
					className="container py-5 mb-5"
					id="bordeAzul"
				>
					<div className="col-12 col-md-4 p-2">
						<h3
							id="bordeAzulCongresistas"
							className="py-2 text-center text-md-start"
						>
							Sesión #: X
						</h3>
					</div>
					<div className="row d-flex justify-content-center align-items-center text-center">
						<CrearSesionForm
							text="Trabajo a presentar:"
							type="search"
							placeholder="Buscar trabajo 🔍"
							value={titulo}
							onChange={(e) => buscarTrabajos(e.target.value)}
						/>
						<div className="col-md-12 text-center w-75">
							{mostrarListaTrabajos && trabajos.length > 0 && (
								<ul className="list-group border border-info-subtle">
									{trabajos.map((trabajo) => (
										<li
											key={trabajo.id_trabajo}
											className="list-group-item list-group-item-action"
											style={{ cursor: "pointer" }}
											onClick={() => seleccionarTrabajo(trabajo)}
										>
											{trabajo.titulo}
										</li>
									))}
								</ul>
							)}
							{trabajos.length === 0 && mostrarListaTrabajos === true && (
								<p className="mb-0 text-danger">No se encontraron trabajos</p>
							)}
						</div>

						{mensajeAutores && (
							<div
								className="alert alert-warning mt-3 w-50"
								role="alert"
							>
								{mensajeAutores}
							</div>
						)}
						{autoresCongresistas.length > 0 && (
							<div className="col-md-12 p-2 mt-3 d-flex flex-column align-items-center">
								<div className="d-md-flex d-sm-inline-block align-items-center justify-content-center w-50">
									<div className="w-75 text-start">
										<label className="fw-bold mb-0">
											Seleccione un ponente:
										</label>
									</div>

									<select className="form-select">
										<option value="">Seleccione un ponente</option>
										{autoresCongresistas.map((autor) => (
											<option
												key={autor.id_autor}
												value={autor.id_autor}
											>
												{autor.nombre}
											</option>
										))}
									</select>
								</div>
							</div>
						)}

						<CrearSesionForm
							text="Fecha:"
							type="date"
							value={fecha}
							onChange={(e) => setFecha(e.target.value)}
						/>
						<CrearSesionForm
							text="Hora:"
							type="time"
							value={hora}
							onChange={(e) => setHora(e.target.value)}
						/>
						<CrearSesionForm
							text="Sala:"
							type="number"
							placeholder="Número de sala"
							value={sala}
							onChange={(e) => setSala(e.target.value)}
						/>

						<CrearSesionForm
							text="Chairman:"
							type="search"
							placeholder="Buscar chairman 🔍"
							value={terminoBusquedaChairman}
							onChange={(e) => buscarMiembrosComite(e.target.value)}
						/>
						<div className="col-md-12 text-center w-75">
                            <p className="text-center mb-0 mt-3 fw-bold">Lista de posibles Chairmain</p>
                            <ul className="list-group border border-info-subtle mt-3">
                                {miembrosFiltrados.length > 0 ? (
                                    miembrosFiltrados.map((miembro) => (
                                        <li
                                            key={miembro.id_congresista ||
                                                `${miembro.nombre}-${Math.random()}`}
                                            className="list-group-item list-group-item-action"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => seleccionarChairman(miembro)}
                                        >
                                            {miembro.nombre} {miembro.apellido}
                                        </li>
                                    ))
                                ) : (
                                    <p>No se encontraron miembros del comité</p>
                                )}
                            </ul>
						</div>

                        <div>
                            <button
                                className="btn btn-primary fw-bold px-4 mt-5 col-md-2 col-sm-8"
                                style={{
                                    boxShadow: "0px 4px 10px #000",
                                    border: "none",
                                    padding: "10px",
                                }}
                            >
                                Crear Sesión
                            </button>
                        </div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
};

export default CrearSesion;
