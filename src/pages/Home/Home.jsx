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
  const storedUserId = localStorage.getItem("userId"); 
  const { user } = useContext(AuthContext);

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
    // Obtener usuario desde localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
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
          {user?.rol === "Congresista" ? (
            <>
              <CardRegister
                question={"¿Eres autor de un trabajo?"}
                register={"Registrate como autor"}
                link={"registerAuthor"}
              />

              <CardRegister
                question={
                  "CICMA es un evento abierto para academicos de todo el mundo que desea presentar sus ultimos descubrimiento sen fisica, quimica, biología, astronomia, entre otras áreas"
                }
                register={"Si deseas presentar tu trabajo, presiona"}
                link={"registerAuthor"}
              />
            </>
          ) : user?.rol === "Autor" ? (
            <>
              <CardRegister
                question={"¿Quieres er parte de este evento?"}
                register={"Registrate como congresista"}
                link={"registerCongressman"}
              />
            </>
          ) : (
            <>
              <CardRegister
                question={"¿Quieres er parte de este evento?"}
                register={"Registrate como congresista"}
                link={"registerCongressman"}
              />
              <CardRegister
                question={"¿Eres autor de un trabajo?"}
                register={"Registrate como autor"}
                link={`registerAuthor/${storedUserId}`}
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
