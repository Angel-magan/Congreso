import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EvolucionInscripciones = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/congresistas/evolucionInscripciones"
        );
        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();

        // Solo mostrar la fecha sin la hora
        const datosFormateados = data.map((item) => ({
          ...item,
          fecha: item.fecha.split("T")[0], // Toma solo la parte de la fecha
        }));

        // setDatos(data);
        setDatos(datosFormateados);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchDatos();
  }, []);

  return (
    <div className="mb-5">
      <h2 className="text-center">Evolución de Inscripciones al Congreso</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={datos}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="fecha"
            angle={-45}
            height={80}
            textAnchor="end"
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cantidad"
            stroke="#0088FE"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EvolucionInscripciones;
