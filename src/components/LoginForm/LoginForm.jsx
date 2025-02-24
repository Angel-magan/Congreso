import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

import AuthContext from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = () => {
    if (email && password) {
      axios
        .post("http://localhost:5000/api/users/login", { email, password })
        .then((response) => {
          const { nombre, rol, apellido, correo } = response.data;
          // Guardar la info del usuario en un contexto o state
          setUser({ nombre, apellido, rol });
          const userData = response.data; // Aquí estará el id del usuario
          localStorage.setItem("userId", userData.id); // Guardar el id en localStorage

          // Guardar datos en localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({ nombre, apellido, correo })
          );

          navigate("/home");
        })
        .catch((error) => {
          console.error("Error al iniciar sesión:", error);
          alert("Usuario o contraseña incorrectos");
        });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <section className="w-50 mx-4">
        <p className="text-center text-danger fw-bold">Iniciar sesión</p>
        <div className="text-center">
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-4"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary px-4 mb-2"
            onClick={handleLogin}
          >
            Acceder
          </button>
        </div>
      </section>
      <section
        className="text-center w-md-25 ps-md-5 border-start border-primary border-3 ms-3 mt-4"
        style={{ borderLeft: "red" }}
      >
        <p className="my-4">¿Aún no estás registrado?</p>
        <p className="mb-2">¡Registrate ahora!</p>
        <Link to="/registerUser">
          <button className="btn btn-warning text-light px-4 mb-3 mt-md-4">
            Registrate
          </button>
        </Link>
      </section>
    </div>
  );
};

export default LoginForm;
