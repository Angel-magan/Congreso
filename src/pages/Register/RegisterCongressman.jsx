import { useEffect, useState } from "react";
import axios from "axios";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Logo from "../../assets/images/imgpng.png";
import Footer from "../../components/Footer/Footer";

const RegisterCongressman = () => {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [notificacion, setNotificacion] = useState(0);
  const [mostrarCheckbox, setMostrarCheckbox] = useState(false);

  // Para acceder a la información del usuario
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setNombre(parsedUser.nombre);
      setApellido(parsedUser.apellido); 
      setCorreo(parsedUser.correo); 
    }
  }, []);

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  const validarFormatoTelefono = (e) => {
    let valor = e.target.value.replace(/\D/g, ''); // Eliminar todo lo que no sea un número5
    valor = valor.slice(0, 8); // Limitar a 8 números
  
    // Formatear el número con guion después del cuarto dígito
    if (valor.length > 4) {
      valor = `${valor.slice(0, 4)}-${valor.slice(4)}`;
    }
  
    setTelefono(valor);
    setMostrarCheckbox(valor.length === 9); 
  };

  const habilitarBoton = institucion.trim() !== '' && (telefono === '' || telefono.length === 9);
  
  const handleRegister = async () => {

    await axios.post('http://localhost:5000/api/congresistas/registerCongressman', {
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      institucion: institucion,
      telefono: telefono, // Puede estar vacío
      notificacion: notificacion
    })
    .then((res) => {
      console.log(res.data);
      alert("✅ Congresista ingresado correctamente");
    })
    .catch((err) => {
      if (err.response) {
        // Captura el mensaje de error enviado por el backend
        const errorMessage = err.response.data.message;
        console.error("Error:", errorMessage);
        alert(`❌ ${errorMessage}`);
      } else {
        alert("❌ Ocurrió un error en la solicitud");
      }    
    })
  }

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
          right: "0px"
        }}
      ></div>
      {/* Circulo azul */}
      <div
        className="d-none d-lg-inline-block"
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
      {/* Cuadro rojo */}
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
      <section className="container mb-4"  >
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 text-center">
            <h2 className="mb-sm-5">¡Registrate como Congresista!</h2>
            {user ? (
              <RegisterForm 
                className="form-control border border-primary"
                text="Nombre:" 
                placeholder="nombre" 
                value={nombre || user.nombre} 
                readOnly
                onChange={(e) => setNombre(user.nombre)}
              />
            ) : (
              <p className="text-danger">Por favor, inicia sesión para continuar.</p>
            )}
            {user ? (
              <RegisterForm 
                text="Apellido:" 
                placeholder="apellido" 
                value={apellido || user.apellido}
                readOnly
                onChange={(e) => setApellido(user.apellido)}
              />
            ) : (
              <p className="text-danger">Por favor, inicia sesión para continuar.</p>
            )}
            {user ? (
              <RegisterForm 
                text="Correo:" 
                placeholder="correo" 
                value={correo || user.correo}
                readOnly
                onChange={(e) => setCorreo(user.correo)}
              />
            ) : (
              <p className="text-danger">Por favor, inicia sesión para continuar.</p>
            )}
            <RegisterForm 
              text="Institución:" 
              placeholder="Institución" 
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
            />
            <div className="d-flex">
              <div className="flex-grow-1 me-2">
                <RegisterForm 
                  text="Teléfono:" 
                  placeholder="XXXX-XXXX" 
                  maxLength="9" 
                  value={telefono} 
                  onChange={validarFormatoTelefono}
                />
              </div>
              <i className="mx-1 text-primary fw-bold">*</i>
            </div>
            <div>
              <p className="text-secondary" style={{marginLeft: "100px"}}>
                *Campo opcional para recibir notificaciones SMS
              </p>
              {mostrarCheckbox && (
                <div id="checkboxNotificaciones" style={{ display: "inline-block" }}>
                  <input 
                    type="checkbox" 
                    aria-label="label" 
                    value={notificacion} 
                    onChange={(e) => setNotificacion(e.target.value)} 
                  />
                  <label className="label fw-bold ms-1 mb-3">Deseo recibir notificaciones</label>
                </div>
              )}
              <br />
              <button 
                type="button"
                className="btn btn-primary fw-bold px-4 mt-2"
                style={{
                  boxShadow: "0px 4px 10px #000",
                  border: "none",
                  padding: "10px",
                  cursor: habilitarBoton ? "pointer" : "not-allowed" 
                }}
                onClick={habilitarBoton ? handleRegister : (e) => e.preventDefault()}
                title={habilitarBoton ? "" :  "Completa los campos requeridos para guardar el registro"}
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterCongressman;
