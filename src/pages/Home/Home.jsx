import { useEffect, useState } from "react";
import Card from "../../components/Card/CardJob";
import CardRegister from "../../components/Card/CardRegister";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [sesiones, setSesiones] = useState([]);

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
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <p className="text-center fw-bold fs-3 m-0 mt-3">
          ¡Hola, <span>{user ? `${user.nombre} ${user.apellido}` : "Invitado"}</span>!
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
                  clock={new Date(sesion.fecha_hora).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
          <CardRegister
            question={"¿Quieres ser parte de este evento?"}
            register={"Regístrate como congresista"}
            link={"registerCongressman"}
            user={user}
          />
          <CardRegister
            question={"¿Eres autor de un trabajo?"}
            register={"Regístrate como autor"}
            link={"registerAuthor"}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
