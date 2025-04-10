// eslint-disable-next-line react/prop-types
import { useEffect, useState, useContext } from "react";
import axios from "axios";

const Card = ({
	titleJob,
	date,
	clock,
	hall,
	chairman,
	ponentesTrabajo,
	idSesion,
}) => {
	const user = JSON.parse(localStorage.getItem("user"));

	const roles = user && user.roles ? user.roles : [];
	console.log("Roles del usuario:", roles);

	const isCongresista = roles.includes("Congresista");

	const [congresistaData, setCongresistaData] = useState(null); // Datos del congresista
	const [loading, setLoading] = useState(true); // Estado de carga
	const [error, setError] = useState(null); // Estado de error

	const [yaAsisto, setYaAsisto] = useState(false); // Estado de error

	useEffect(() => {
		// Si el usuario es congresista, obtener sus datos
		if (isCongresista && !congresistaData) {
			// Realizar la solicitud para obtener los datos del congresista usando el ID del usuario
			axios
				.get(
					`http://localhost:5000/api/congresistas/congressmanInfo/${
						user.id || user.id_usuario
					}`
				)
				.then((response) => {
					setCongresistaData(response.data); // Guardar los datos en el estado
					setLoading(false); // Cambiar el estado de carga a false
				})
				.catch((err) => {
					setError("Error al cargar la información del congresista.");
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, [isCongresista, congresistaData]);

	useEffect(() => {
		if (congresistaData) {
			const verificarAsistencia = async () => {
				try {
					const response = await axios.get(
						`http://localhost:5000/api/sesiones/verificarAsistencia/${congresistaData.id_congresista}/${idSesion}`
					);

					if (response.data.asistio) {
						setYaAsisto(true);
					}
				} catch (error) {
					console.error("Error al verificar asistencia:", error);
				}
			};

			verificarAsistencia();
		}
	}, [congresistaData, idSesion]);

	if (loading) {
		return <p>Cargando datos...</p>;
	}

	// Si ocurre un error, muestra el mensaje de error
	if (error) {
		return <p>{error}</p>;
	}

	const handleAsistir = async () => {
		//console.log("ID del congresista:", congresistaData.id_congresista);
		//console.log("ID de la sesión:", idSesion);
		if (!congresistaData || !idSesion) return;

		try {
			const response = await axios.post(
				"http://localhost:5000/api/sesiones/asistir-sesion",
				{
					id_congresista: congresistaData.id_congresista,
					id_sesion: idSesion,
				}
			);

			alert("¡Registro exitoso! Asistencia confirmada.");
			console.log("Respuesta del servidor:", response.data);
			setYaAsisto(true); // Actualiza el estado para reflejar que ya asistió
		} catch (error) {
			console.error("Error al registrar asistencia:", error);
			alert("Ocurrió un error al registrar tu asistencia.");
		}
	};

	return (
		<div className="card border-warning w-100 me-3">
			<div className="card-body">
				{Array.isArray(titleJob) ? (
					<ul>
						{titleJob.map((titulo, index) => (
							<li key={index}>{titulo}</li>
						))}
					</ul>
				) : (
					<p>{titleJob}</p>
				)}

				<section className="d-flex flex-column flex-md-row">
					<p className="card-text me-md-3">
						<i className="bi bi-calendar-date-fill text-primary"></i>
						<span className="ms-2">{date}</span>
					</p>
					<p className="card-text">
						<i className="bi bi-clock-fill text-primary"></i>
						<span className="ms-2">{clock}</span>
					</p>
				</section>

				<p className="card-text mt-2">
					<i className="bi bi-geo-fill"></i> {hall}
				</p>
				<p className="card-text">
					<i className="bi bi-mic-fill text-primary"></i> Chairman:{" "}
					<span>{chairman}</span>
				</p>
				<p className="card-text">
					<i className="bi bi-megaphone-fill text-warning"></i> Ponente/s:{" "}
					<div>
						{typeof ponentesTrabajo === "string" && ponentesTrabajo.trim() !== "" ? (
							<ul>
								{ponentesTrabajo.split(",").map((ponente, index) => (
									<li key={index}>{ponente.trim()}</li>
								))}
							</ul>
						) : Array.isArray(ponentesTrabajo) && ponentesTrabajo.length > 0 ? (
							<ul>
								{ponentesTrabajo.map((ponente, index) => (
									<li key={index}>{ponente}</li>
								))}
							</ul>
						) : (
							<p>No hay ponentes disponibles</p>
						)}
					</div>
				</p>
			</div>
			{isCongresista && !yaAsisto && (
				<div className="d-flex justify-content-center mb-3">
					<button
						className="btn bg-warning text-white w-50"
						onClick={handleAsistir}
					>
						Asistir
					</button>
				</div>
			)}
		</div>
	);
};

export default Card;
