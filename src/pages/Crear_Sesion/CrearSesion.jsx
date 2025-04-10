import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import CrearSesionForm from "../../components/CrearSesionForm/CrearSesionForm";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "../Administrar_Miembros_Comite/style.css";

const CrearSesion = () => {
	const [titulo, setTitulo] = useState("");
	const [trabajos, setTrabajos] = useState([]);
	const [trabajosSeleccionados, setTrabajosSeleccionados] = useState([]);
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
	const [tituloBusqueda, setTituloBusqueda] = useState("");
	const [fechaValida, setFechaValida] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		// Solo llamar al endpoint si fecha y hora tienen valores
		if (fecha && hora) {
			const obtenerMiembrosComite = async () => {
				try {
					const response = await axios.get(
						"http://localhost:5000/api/sesiones/miembros-comite",
						{
							params: { fecha, hora }, // Pasar fecha y hora como parámetros
						}
					);
					console.log("Miembros del comité (JSON):", JSON.stringify(response.data, null, 2));
					setMiembrosComite(response.data);
					setMiembrosFiltrados(response.data); 
				} catch (error) {
					console.error("Error al obtener miembros del comité:", error);
				}
			};
			obtenerMiembrosComite();
		}
	}, [fecha, hora]);

	const buscarTrabajos = async (titulo) => {
		setTituloBusqueda(titulo);
		if (titulo.trim() !== "") {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/users/buscarParaCrearSesion?titulo=${titulo}`
				);
				setTrabajos(response.data);
				setMostrarListaTrabajos(true);
			} catch (error) {
				console.error("Error al buscar trabajos:", error);
				setMostrarListaTrabajos(false);
			}
		} else {
			setTrabajos([]);
			setMostrarListaTrabajos(false);
		}
	};

	const seleccionarTrabajo = async (trabajo) => {
		// Verifica si el trabajo ya está en la lista de seleccionados
		if (
			!trabajosSeleccionados.some((t) => t.id_trabajo === trabajo.id_trabajo)
		) {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/users/${trabajo.id_trabajo}/autores`
				);
				const trabajoConAutores = {
					...trabajo,
					autores: response.data,
					mensajeAutores:
						response.data.length === 0
							? "No se encontraron autores para este trabajo."
							: "",
				};
				setTrabajosSeleccionados([...trabajosSeleccionados, trabajoConAutores]);
				setMostrarListaTrabajos(false);
				setTituloBusqueda("");
				setTrabajos([]);
				setMensajeAutores(""); // Limpiar el mensaje global de autores
			} catch (error) {
				console.error("Error al obtener autores congresistas:", error);
			}
		}
	};

	const eliminarTrabajoSeleccionado = (idTrabajo) => {
		const nuevosTrabajosSeleccionados = trabajosSeleccionados.filter(
			(trabajo) => trabajo.id_trabajo !== idTrabajo
		);
		setTrabajosSeleccionados(nuevosTrabajosSeleccionados);
	};

	const handleAutorChange = (trabajoId, autorId) => {
		// Depurar el cambio de autor
		console.log(`Cambiando autor para trabajo ID ${trabajoId} a autor ID ${autorId}`);
		setTrabajosSeleccionados((prevTrabajos) => {
			const nuevosTrabajos = prevTrabajos.map((trabajo) => {
				if (trabajo.id_trabajo === trabajoId) {
					return { ...trabajo, autorSeleccionado: autorId }; // Actualizar autorSeleccionado
				}
				return trabajo;
			});
			// Depurar el estado actualizado
			console.log("Estado actualizado de trabajosSeleccionados:", JSON.stringify(nuevosTrabajos, null, 2));
			return nuevosTrabajos;
		});
	};

	const handleFechaChange = (e) => {
		const selectedDate = new Date(e.target.value);
		const validDates = [
			new Date("2025-06-25"),
			new Date("2025-06-26"),
			new Date("2025-06-27"),
			new Date("2025-06-28"),
		];

		// Verificar si la fecha seleccionada es válida
		if (
			validDates.some(
				(date) => date.toDateString() === selectedDate.toDateString()
			)
		) {
			setFecha(e.target.value); // Actualizar si la fecha es válida
			setFechaValida(true); // Marcar la fecha como válida
		} else {
			setFechaValida(false); // Marcar la fecha como inválida
			e.target.value = ""; // Limpiar el input si la fecha no es válida
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
		console.log("Chairman seleccionado: ", miembro); // Depuración
		setChairmanSeleccionado(miembro); // Asegúrate de que miembro incluye id_usuario
		setTerminoBusquedaChairman(`${miembro.nombre} ${miembro.apellido}`);
	};

	const guardarSesion = async () => {
		// Validar que todos los campos estén completos
		if (!fecha || !hora || !sala || !chairmanSeleccionado || trabajosSeleccionados.length === 0) {
			Swal.fire({
				title: "Error",
				text: "Por favor, complete todos los campos antes de guardar.",
				icon: "error",
				showConfirmButton: false,
				timer: 2000,
			});
			return;
		}

		try {
			// Depurar el estado de trabajosSeleccionados antes de construir datosSesion
			console.log("Estado de trabajosSeleccionados antes de enviar:", JSON.stringify(trabajosSeleccionados, null, 2));

			// Crear el objeto con los datos de la sesión
			const datosSesion = {
				trabajos: trabajosSeleccionados.map((t) => ({
					id_trabajo: t.id_trabajo,
					id_autor: t.autorSeleccionado || null,
				})),
				fecha: `${fecha}`,
				sala: parseInt(sala),
				chairman_id: chairmanSeleccionado?.id_usuario,
				hora: `${hora}:00`,
			};

			// Imprimir los datos enviados al backend
			console.log("Datos enviados al servidor:", JSON.stringify(datosSesion, null, 2));

			// Enviar los datos al servidor
			const response = await axios.post(
				"http://localhost:5000/api/sesiones/crearSesion",
				datosSesion
			);

			Swal.fire({
				title: "Success",
				text: "Sesión guardada con éxito",
				icon: "success",
				showConfirmButton: false,
				timer: 1500,
			});
			navigate("/home");
			console.log("Sesión guardada con éxito:", response.data);
		} catch (error) {
			// Manejar errores del servidor y mostrar mensaje al usuario
			if (error.response && error.response.data && error.response.data.error) {
				alert(`Error: ${error.response.data.error}`);
			} else {
				alert("Hubo un error al guardar la sesión.");
			}
			console.error("Error al guardar la sesión:", error);
		}
	};

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
							Nueva sesión
						</h3>
					</div>
					<div className="row d-flex justify-content-center align-items-center text-center">
						{/* Sección para buscar y seleccionar trabajos */}
						<div className="mt-3">
							<label htmlFor="buscarTrabajo">Trabajo a presentar:</label>
							<CrearSesionForm
								text="Trabajo a presentar:"
								type="search"
								placeholder="Buscar trabajo 🔍"
								value={tituloBusqueda}
								onChange={(e) => buscarTrabajos(e.target.value)}
							/>
							<div className="col-md-12 text-center w-75 m-auto">
								{mostrarListaTrabajos && trabajos.length > 0 && (
									<ul className="list-group border border-info-subtle mt-3">
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
						</div>

						{/* Lista de trabajos seleccionados */}
						<div className="col-md-12 text-center w-75 mb-3">
							{trabajosSeleccionados.length > 0 && (
								<div className="mt-3">
									<h3 className="badge rounded-pill text-bg-info fs-6">
										Trabajos Seleccionados:
									</h3>
									<ul className="list-group border border-info-subtle mt-3">
										{trabajosSeleccionados.map((trabajo) => (
											<li
												key={trabajo.id_trabajo}
												className="list-group-item d-flex flex-column align-items-start"
											>
												<div className="d-flex justify-content-between align-items-center w-100">
													<span>{trabajo.titulo}</span>
													<button
														type="button"
														className="btn btn-sm btn-danger ms-2"
														onClick={() =>
															eliminarTrabajoSeleccionado(trabajo.id_trabajo)
														}
													>
														Eliminar
													</button>
												</div>
												{trabajo.autores && trabajo.autores.length > 0 && (
													<div className="mt-1 ms-2">
														<span className="fw-bold">Autor(es):</span>
														<select
															className="form-select form-select-sm w-auto d-inline-block ms-2"
															value={trabajo.autorSeleccionado || ""}
															onChange={(e) =>
																handleAutorChange(
																	trabajo.id_trabajo,
																	parseInt(e.target.value)
																)
															}
														>
															<option value="">Seleccionar</option>
															{trabajo.autores.map((autor) => (
																<option
																	key={autor.id_autor}
																	value={autor.id_autor}
																>
																	{autor.nombre} {autor.apellido}
																</option>
															))}
														</select>
													</div>
												)}
												{trabajo.mensajeAutores && (
													<p
														className="text-muted ms-2"
														style={{ fontSize: "0.9rem" }}
													>
														{trabajo.mensajeAutores}
													</p>
												)}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						<CrearSesionForm
							text="Fecha:"
							type="date"
							value={fecha}
							onChange={handleFechaChange}
							placeholder={fechaValida ? "" : "Fecha no válida"}
						/>
						{!fechaValida && (
							<div>
								<p className="text-danger mb-0">
									Por favor, seleccione una fecha válida.
								</p>
								<p className="text-danger mt-0">
									Las fechas del congreso son: 25, 26, 27 y 28 de junio de 2025.
								</p>
							</div>
						)}
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
							<p className="text-center mb-0 mt-3 fw-bold">
								Lista de posibles Chairmain
							</p>
							<ul className="list-group border border-info-subtle mt-3">
								{miembrosFiltrados.length > 0 ? (
									miembrosFiltrados.map((miembro) => (
										<li
											key={
												miembro.id_congresista ||
												`${miembro.nombre}-${Math.random()}`
											}
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

						<div className="d-flex justify-content-evenly">
							<button
								className="btn btn-primary fw-bold px-4 mt-5 col-md-2 col-sm-8"
								style={{
									boxShadow: "0px 4px 10px #000",
									border: "none",
									padding: "10px",
								}}
								onClick={guardarSesion}
							>
								Crear Sesión
							</button>
							<button
								className="btn btn-secondary fw-bold px-4 mt-5 col-md-2 col-sm-8"
								style={{
									boxShadow: "0px 4px 10px #000",
									border: "none",
									padding: "10px",
								}}
								onClick={() => navigate("/home")}
							>
								Cancelar
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
