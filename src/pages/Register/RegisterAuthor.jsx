// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom"; // Para obtener el usuario que hizo clic
// import RegisterForm from "../../components/RegisterForm/RegisterForm";
// import Logo from "../../assets/images/imgpng.png";
// import Footer from "../../components/Footer/Footer";
// import "../Register/style.css";

// const RegisterAuthor = () => {
//   const { userId: paramUserId } = useParams();
//   //Como efecto de prueba he puesto el || 7, que si no recibe un id como parametro ocupa el id user 7, pero al momento que tengamos
//   //El home, recibira ese id, se debe validar que ese id no sea nullo, si no se tomará como que el usuario no existe (no tiene cuenta)
//   //lo cual irrumpe un criterio de aceptación, gracias
//   const userId = paramUserId || "9";
//   const [userData, setUserData] = useState({
//     nombre: "",
//     apellido: "",
//     correo: "",
//     idCongresista: "",
//   });

//   const [aceptaTerminos, setAceptaTerminos] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   useEffect(() => {
//     //const testUserId = "4"; // Forzar el ID para prueba
//     if (userId) {
//       axios
//         .get(`http://localhost:5000/api/users/autor/${userId}`) // Cambié la URL
//         .then((response) => {
//           //console.log("Datos del usuario:", response.data);
//           setUserData({
//             nombre: response.data.nombre,
//             apellido: response.data.apellido,
//             correo: response.data.correo,
//             idCongresista: response.data.idCongresista,
//           });
//         })
//         .catch((error) => console.error("Error cargando usuario:", error));
//     }
//   }, [userId]);

//   const handleCheckboxChange = () => {
//     setAceptaTerminos(!aceptaTerminos);
//   };

//   // Función handleSubmit del frontend
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!aceptaTerminos) return;

//     const data = {
//       id_usuario: userId,
//       id_congresista: userData.idCongresista || null,
//     };

//     console.log("Enviando datos al backend:", data);

//     axios
//       .post("http://localhost:5000/api/users/autor", data) // Esta es la ruta de tu backend
//       .then((response) => {
//         console.log("Respuesta del servidor:", response.data);
//         setSuccessMessage("¡Registro exitoso!");
//         setTimeout(() => setSuccessMessage(""), 3000);
//       })
//       .catch((error) => console.error("Error en el registro:", error));
//   };

//   return (
//     <div className="fondo d-block justify-content-center align-items-center min-vh-100">
//       <img
//         src={Logo}
//         className="img-fluid"
//         alt="Logo"
//         style={{ width: "200px" }}
//       />

//       <div
//         className="container p-5 bg-white text-center"
//         style={{ maxWidth: "700px" }}
//       >
//         <h1 className="fw-bold mb-4">¡Regístrate como autor!</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3 text-start w-100">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Nombre"
//               value={userData.nombre}
//               readOnly
//             />
//           </div>

//           <div className="mb-3 text-start w-100 ">
//             <input
//               type="text"
//               className="form-control "
//               placeholder="Apellido"
//               value={userData.apellido}
//               readOnly
//             />
//           </div>

//           <div className="mb-3 text-start">
//             <input
//               type="email"
//               className="form-control"
//               name="Correo"
//               value={userData.correo}
//               readOnly
//               placeholder="Correo"
//             />
//           </div>

//           {/* Mostrar el campo idCongresista solo si el usuario tiene un idCongresista */}
//           {userData.idCongresista ? (
//             <div className="mb-3 text-start ">
//               <h6>ID Congresista:</h6>
//               <input
//                 type="text"
//                 className="form-control "
//                 name="idCongresista"
//                 value={userData.idCongresista}
//                 readOnly
//                 placeholder="ID de Congresista"
//               />
//             </div>
//           ) : null}

//           <div className="form-check text-start mb-3">
//             <input
//               type="checkbox"
//               className="form-check-input"
//               id="acepto"
//               checked={aceptaTerminos}
//               onChange={handleCheckboxChange}
//             />
//             <label className="form-check-label" htmlFor="acepto">
//               Acepto ser registrado en la plataforma CICMA como autor
//             </label>
//             <i className="mx-1 text-primary fw-bold"> *</i>
//             <i className="bi bi-question-circle-fill fs-4 text-warning"></i>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-50 py-2 fw-bold"
//             disabled={!aceptaTerminos}
//           >
//             Registrarme
//           </button>
//         </form>
//         {successMessage && (
//           <div className="success-message ">{successMessage}</div>
//         )}
//       </div>
//       <div className="trianguloo"></div>
//       <div className="circulo"></div>
//       <div className="cuadrado"></div>
//       <div className="fixed-bottom">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default RegisterAuthor;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Para obtener el usuario que hizo clic
import AuthContext from "../../context/AuthContext"; // Importar el contexto de autenticación
import Logo from "../../assets/images/imgpng.png";
import Footer from "../../components/Footer/Footer";
import "../Register/style.css";

const RegisterAuthor = () => {
  const { setUser } = useContext(AuthContext); // Obtener usuario autenticado
  const { userId: paramUserId } = useParams();
  const navigate = useNavigate();

  // Si existe un `paramUserId` lo usamos, de lo contrario tomamos el ID del usuario autenticado
  const userId = paramUserId;

  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    idCongresista: "",
  });

  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/autor/${userId}`)
        .then((response) => {
          setUserData({
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            correo: response.data.correo,
            idCongresista: response.data.idCongresista,
          });
        })
        .catch((error) => console.error("Error cargando usuario:", error));
    } else {
      console.log("Id", userId);
    }
  }, [userId]);

  const handleCheckboxChange = () => {
    setAceptaTerminos(!aceptaTerminos);
  };

  //Se agrego ahorita y este si funciona más o menos
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!aceptaTerminos) return;

    try {
      const data = {
        id_usuario: userId,
        id_congresista: userData.idCongresista || null,
      };

      const res = await axios.post(
        "http://localhost:5000/api/users/autor",
        data
      );
      console.log("Respuesta de registro:", res.data);
      setSuccessMessage("¡Registro exitoso!");
      setTimeout(() => setSuccessMessage(""), 5000);

      // Actualizar el usuario desde la API
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        const userId = currentUser.id || currentUser.id_usuario;

        const userRes = await axios.get(
          `http://localhost:5000/api/users/infoUser/${userId}`
        );

        console.log("Usuario actualizado:", userRes.data);

        // Guardar el usuario actualizado en localStorage
        localStorage.setItem("user", JSON.stringify(userRes.data));

        // Actualizar el contexto de autenticación
        setUser(userRes.data);
      }

      // Redirigir al home
      navigate("/home");
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        console.error("Error:", errorMessage);
        alert(`❌ ${errorMessage}`);
      } else {
        alert("❌ Ocurrió un error en la solicitud");
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

        {userId ? (
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
              <label className="form-check-label" htmlFor="acepto">
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
