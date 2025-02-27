import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        // alert("Por favor, ingresa un correo electrónico válido.");
        Swal.fire({
          title: "Error",
          text: "Por favor, ingresa un correo electrónico válido.",
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
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
          Swal.fire({
            title: "Registro",
            text: "Usuario ingresado correctamente.",
            icon: "success",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate("/"); //Aqui lo manda al login
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            if (error.response.data.message.includes("La contraseña")) {
              Swal.fire({
                title: "Contraseña",
                text: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número.",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "El correo ya está registrado. Usa otro email.",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
              });
            }
          } else {
            console.error("Error registrando usuario:", error);
            Swal.fire({
              title: "Registro",
              text: "Hubo un problema al registrar el usuario.",
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div>
      {/* Cuadro amarrillo */}
      <div
        className="d-none d-lg-block"
        style={{
          width: "200px",
          height: "200px",
          background: "#EABC54",
          position: "absolute",
          right: "0px",
        }}
      ></div>
      {/* Circulo azul */}
      <div
        className="d-none d-lg-block"
        style={{
          width: "220px",
          height: "220px",
          background: "#4DB3CE",
          position: "absolute",
          bottom: "0px",
          right: "0px",
          borderRadius: "100% 90px",
          borderEndEndRadius: "0px",
        }}
      ></div>
      <div
        className="d-none d-lg-block"
        style={{
          width: "250px",
          height: "250px",
          clipPath: "polygon(0% 130%, 100% 50%, 0% 40%)", // Define la forma del triángulo
          position: "absolute",
          bottom: "0px",
          left: "0px",
          background: "#EE8561",
        }}
      ></div>
      <img src={Logo} className="img-fluid w-25 h-25 rounded" alt="Logo"></img>
      {/* cuadro de inputs */}
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
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
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
      {/* Cuadro inputs */}
    </div>
  );
};

export default RegisterPage;
