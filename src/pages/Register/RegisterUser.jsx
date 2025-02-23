import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Logo from "../../assets/images/imgpng.png";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hoverDisabled, setHoverDisabled] = useState(false); // Estado para controlar hover
  const navigate = useNavigate(); //Esto permite redirigir a otras rutas

  const handleRegister = () => {
    console.log("Valores actuales:", { name, lastName, email, password });
    // Validar el formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (name && lastName && email && password) {
      // Verificar si el correo tiene un formato válido
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return; // Detener el registro si el correo no es válido
      }
      // Hacer la solicitud al backend para registrar el usuario
      axios
        .post("http://localhost:5000/api/users/register", {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          alert("Usuario ingresado correctamente");
          navigate("/"); //Aqui lo manda al login
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            if (error.response.data.message.includes("La contraseña")) {
              alert(
                "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número."
              );
            } else {
              alert("El correo ya está registrado. Usa otro email.");
            }
          } else {
            console.error("Error registrando usuario:", error);
            alert("Hubo un problema al registrar el usuario.");
          }
        });
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div>
      <section className="d-flex justify-content-between">
        <div className="w50 h-50">
          <img
            src={Logo}
            className="img-fluid w-50 h-50 rounded"
            alt="Logo"
          ></img>
        </div>
        <div className="bg-warning w-25"></div>
      </section>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 text-center">
            <h2>Registro de usuario</h2>
            <RegisterForm
              text="Nombre:"
              type="text"
              placeholder="nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <RegisterForm
              text="Apellido:"
              type="text"
              placeholder="apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <RegisterForm
              text="Correo:"
              type="text"
              placeholder="correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="d-flex">
              <div className="flex-grow-1 me-2">
                <RegisterForm
                  text="Contraseña:"
                  type={showPassword ? "text" : "password"}
                  placeholder="contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill fs-4 text-primary"></i>
                ) : (
                  <i className="bi bi-eye-fill fs-4 text-primary"></i>
                )}
              </span>
            </div>
            {/* Envolvemos el botón en un contenedor que detecta hover */}
            <div
              className="position-relative d-inline-block"
              onMouseEnter={() => setHoverDisabled(true)}
              onMouseLeave={() => setHoverDisabled(false)}
            >
              <button
                type="button"
                className="btn btn-primary fw-bold px-4"
                disabled={!name || !lastName || !email || !password}
                onClick={handleRegister}
              >
                Registrarme
              </button>
              {/* Mostramos el ícono si el botón está deshabilitado y se está haciendo hover */}
              {(!name || !lastName || !email || !password) && hoverDisabled && (
                <div
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{ pointerEvents: "none" }}
                >
                  <i className="bi bi-ban text-danger fw-bold fs-4"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
