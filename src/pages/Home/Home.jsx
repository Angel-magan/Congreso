import { useEffect, useState, useContext } from "react";
import Card from "../../components/Card/CardJob";
import CardRegister from "../../components/Card/CardRegister";
import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../context/AuthContext";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState(null);
  const [sesiones, setSesiones] = useState([]);
  // El AuthContext provee { user }
  const { user } = useContext(AuthContext);

  // Si el usuario tiene ambos roles, podemos mostrar una sola card
  const roles = user && user.roles ? user.roles : [];
  console.log("Roles del usuario:", roles);

  const isCongresista = roles.includes("Congresista");
  const isAutor = roles.includes("Autor");
  const isNormal = !isCongresista && !isAutor;
  const isAmbos = isCongresista && isAutor;

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

  return (
    <>
      <Navbar />
      <div>
        <p className="text-center fw-bold fs-3 m-0 mt-3">
          ¡Hola,{" "}
          <span>{user ? `${user.nombre} ${user.apellido}` : "Invitado"}</span>!
          !
        </p>
        <section className="border border-primary border-2 p-3 m-4 rounded">
          <h3 className="border-bottom border-primary border-3 mx-2 w-25">
            Programación
          </h3>
          <div className="d-flex justify-content-center mb-2">
            {Array.isArray(sesiones) ? (
              sesiones.map((sesion, index) => (
                <Card
                  key={index}
                  titleJob={sesion.titulo}
                  date={new Date(sesion.fecha_hora).toLocaleDateString()}
                  clock={new Date(sesion.fecha_hora).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  hall={`Sala: ${sesion.sala}`}
                  chairman={sesion.moderador}
                  ponente={sesion.ponente}
                />
              ))
            ) : (
              <p>No hay sesiones disponibles</p>
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
