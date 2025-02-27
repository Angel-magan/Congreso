import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Logo from "../../assets/images/imgpng.png";
import Footer from "../../components/Footer/Footer";
import "../Register/style.css";
import Swal from "sweetalert2";

const RegisterAuthor = () => {
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		nombre: "",
		apellido: "",
		correo: "",
		idCongresista: "",
	});

	const [aceptaTerminos, setAceptaTerminos] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	// useEffect(() => {
	// 	console.log("User en RegisterAuthor:", user); // Añadido para depuración
	// 	if (user) {
	// 		setUserData({
	// 			nombre: user.nombre || "",
	// 			apellido: user.apellido || "",
	// 			correo: user.correo || "",
	// 			idCongresista: user.idCongresista || "",
	// 		});
	// 	}
	// }, [user]);

	useEffect(() => {
		//const testUserId = "4"; // Forzar el ID para prueba
		if (user) {
			axios
				.get(`http://localhost:5000/api/users/autor/${user.id_usuario}`) // Cambié la URL
				.then((response) => {
					//console.log("Datos del usuario:", response.data);
					setUserData({
						nombre: response.data.nombre,
						apellido: response.data.apellido,
						correo: response.data.correo,
						idCongresista: response.data.idCongresista,
					});
				})
				.catch((error) => console.error("Error cargando usuario:", error));
		}
	}, [user]);

	const handleCheckboxChange = () => {
		setAceptaTerminos(!aceptaTerminos);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!aceptaTerminos) return;

		try {
			const data = {
				id_usuario: user.id || user.id_usuario,
				id_congresista: userData.idCongresista || null,
			};

			const res = await axios.post(
				"http://localhost:5000/api/users/autor",
				data
			);
			console.log("Respuesta de registro:", res.data);
			Swal.fire({
				title: "Autor registrado",
				text: "El autor se ha registrado correctamente.",
				icon: "success",
				showConfirmButton: false,
				timer: 2000,
			});

			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				const currentUser = JSON.parse(storedUser);
				const userId = currentUser.id || currentUser.id_usuario;

				const userRes = await axios.get(
					`http://localhost:5000/api/users/infoUser/${userId}`
				);

				console.log("Usuario actualizado:", userRes.data);

				localStorage.setItem("user", JSON.stringify(userRes.data));

				setUser(userRes.data);
			}

			setTimeout(() => {
				navigate("/home");
			}, 2000);
		} catch (err) {
			if (err.response) {
				const errorMessage = err.response.data.message;
				console.error("Error:", errorMessage);
				Swal.fire({
					title: "Error",
					text: `❌ ${errorMessage}`,
					icon: "error",
					showConfirmButton: false,
					timer: 2000,
				});

			} else {
				Swal.fire({
					title: "Error",
					text: "❌ Ocurrió un error en la solicitud",
					icon: "error",
					showConfirmButton: false,
					timer: 2000,
				});
			}
		}
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
				<h1 className="fw-bold mb-4">¡Regístrate como autor!</h1>
				{user ? ( // Usar 'user' en lugar de 'userId'
					<form onSubmit={handleSubmit}>
						<div className="mb-3 text-start w-100">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								value={userData.nombre}
								readOnly
							/>
						</div>
						<div className="mb-3 text-start w-100 ">
							<input
								type="text"
								className="form-control "
								placeholder="Apellido"
								value={userData.apellido}
								readOnly
							/>
						</div>
						<div className="mb-3 text-start">
							<input
								type="email"
								className="form-control"
								name="Correo"
								value={userData.correo}
								readOnly
								placeholder="Correo"
							/>
						</div>
						{userData.idCongresista && (
							<div className="mb-3 text-start ">
								<h6>ID Congresista:</h6>
								<input
									type="text"
									className="form-control "
									name="idCongresista"
									value={userData.idCongresista}
									readOnly
								/>
							</div>
						)}
						<div className="form-check text-start mb-3">
							<input
								type="checkbox"
								className="form-check-input"
								id="acepto"
								checked={aceptaTerminos}
								onChange={handleCheckboxChange}
							/>
							<label
								className="form-check-label"
								htmlFor="acepto"
							>
								Acepto ser registrado en la plataforma CICMA como autor
							</label>
							<i className="mx-1 text-primary fw-bold"> *</i>
							<i className="bi bi-question-circle-fill fs-4 text-warning"></i>
						</div>
						<button
							type="submit"
							className="btn btn-primary w-50 py-2 fw-bold"
							disabled={!aceptaTerminos}
						>
							Registrarme
						</button>
					</form>
				) : (
					<p>Debes iniciar sesión para registrarte como autor.</p>
				)}
				{successMessage && (
					<div className="success-message ">{successMessage}</div>
				)}
			</div>
			<div className="trianguloo"></div>
			<div className="circulo"></div>
			<div className="cuadrado"></div>
			<div className="fixed-bottom">
				<Footer />
			</div>
		</div>
	);
};

export default RegisterAuthor;
