import { useEffect, useState, useContext } from "react";
import Card from "../../components/Card/CardJob";
import CardRegister from "../../components/Card/CardRegister";
import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../context/AuthContext";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
	// eslint-disable-next-line no-unused-vars
	const [userInfo, setUserInfo] = useState(null);
	const [sesiones, setSesiones] = useState([]);
	// El AuthContext provee { user }
	const { user } = useContext(AuthContext);
  	const navigate = useNavigate();

	// Si el usuario tiene ambos roles, podemos mostrar una sola card
	const roles = user && user.roles ? user.roles : [];
	console.log("Roles del usuario:", roles);

	const isCongresista = roles.includes("Congresista");
	const isAutor = roles.includes("Autor");
	const isNormal = !isCongresista && !isAutor;
	const isAmbos = isCongresista && isAutor;
	const isComite = roles.includes("miembro_comite");

	useEffect(() => {
		const fetchSesiones = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/sesiones");
				setSesiones(response.data);
			} catch (error) {
				console.error("Error fetching sesiones:", error);
			}
		};

		fetchSesiones();
	}, []);

	useEffect(() => {
		// Escuchar cambios en localStorage para actualizar userInfo y roles
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			const parsedUser = JSON.parse(storedUser);
			setUserInfo(parsedUser);
		}
	}, [user]); // Se ejecuta cuando el contexto de usuario cambia

	//Se agrego ahorita
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (!user) {
			navigate("/"); // Redirige al login si no hay usuario en localStorage
		}
	}, []);

	return (
		<>
			<Navbar />
			<div>
				<p className="text-center fw-bold fs-3 m-0 mt-3">
					¡Hola,{" "}
					<span>{user ? `${user.nombre} ${user.apellido}` : "Invitado"}</span>!
				</p>
				<section className="border border-primary border-2 p-3 m-4 rounded">
					<div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
						<h3 className="border-bottom border-primary border-3 mx-2 d-inline-block">
							Programación
						</h3>

						{isComite && (
							<div className="dropdown mt-2 mt-md-0 text-md-end">
								<button
									className="btn btn-primary dropdown-toggle px-3 py-2 shadow-sm rounded"
									type="button"
									id="dropdownMenuButton1"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									style={{
										minWidth: "120px",
										backgroundColor: "#007bff",
										borderColor: "#0056b3",
									}} // Azul moderno
								>
									Navegación
								</button>
								<ul
									className="dropdown-menu dropdown-menu-end shadow rounded bg-light"
									aria-labelledby="dropdownMenuButton1"
									style={{ border: "1px solid #ddd" }} // Borde sutil
								>
									<li>
										<Link
											className="dropdown-item text-dark"
											to="/administrarComite"
										>
											Administrar Comité
										</Link>
									</li>
									<li>
										<Link
											className="dropdown-item text-dark"
											to="/crearSesion"
										>
											Crear Sesión
										</Link>
									</li>
									<li>
										<Link
											className="dropdown-item text-dark"
											to="/aceptarTrabajo"
										>
											Aceptar Trabajos
										</Link>
									</li>
									<li>
										<Link
											className="dropdown-item text-dark"
											to="/Reportes"
										>
											Reportes
										</Link>
									</li>
									<li>
										<Link
											className="dropdown-item text-dark"
											to="/menuGraficas"
										>
											Gráficas
										</Link>
									</li>
								</ul>
							</div>
						)}
					</div>


					<br />
					<div className="row g-3">
						{Array.isArray(sesiones) ? (
							sesiones.map((sesion, index) => (
								<div
									key={index}
									className="col-12 col-md-6 col-lg-4 d-flex justify-content-center"
								>
									{/* Depurar los datos de la sesión */}
									{console.log("Sesión:-- ", sesion)}

									<Card
										titleJob={sesion.titulos_trabajos}
										date={new Date(sesion.fecha_hora).toLocaleDateString()}
										clock={new Date(sesion.fecha_hora).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
										hall={`Sala: ${sesion.sala}`}
										chairman={sesion.moderador}
										ponentesTrabajo={sesion.ponentes_trabajo || "No hay ponentes disponibles"} // Mostrar mensaje si está vacío
										idSesion={sesion.id_sesion}
									/>
								</div>
							))
						) : (
							<p className="text-center">No hay sesiones disponibles</p>
						)}
					</div>
				</section>
				<div className="m-4">
					{isNormal && (
						<>
							<CardRegister
								question={"¿Quieres ser parte de este evento?"}
								register={"Regístrate como congresista"}
								link={"registerCongressman"}
							/>
							<CardRegister
								question={"¿Eres autor de un trabajo?"}
								register={"Regístrate como autor"}
								link={"registerAuthor"}
							/>
						</>
					)}

					{isCongresista && !isAutor && (
						<>
							<CardRegister
								question={"¿Eres autor de un trabajo?"}
								register={"Regístrate como autor"}
								link={"registerAuthor"}
							/>
							<CardRegister
								question={
									"CICMA es un evento abierto para académicos de todo el mundo que desean presentar sus últimos descubrimientos en física, química, biología, astronomía, entre otras áreas"
								}
								register={"Si deseas presentar tu trabajo, presiona"}
								link={"subirTrabajo"}
							/>
						</>
					)}

					{isAutor && !isCongresista && (
						<>
							<CardRegister
								question={"¿Quieres ser parte de este evento?"}
								register={"Regístrate como congresista"}
								link={"registerCongressman"}
							/>
						</>
					)}

					{isAmbos && (
						<>
							<CardRegister
								question={
									"CICMA es un evento abierto para académicos de todo el mundo que desean presentar sus últimos descubrimientos en física, química, biología, astronomía, entre otras áreas"
								}
								register={"Si deseas presentar tu trabajo, presiona"}
								link={"subirTrabajo"}
							/>
						</>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Home;
