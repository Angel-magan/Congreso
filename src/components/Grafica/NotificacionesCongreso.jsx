import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const NotificacionesCongreso = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/congresistas/notificaciones"
        );
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };

    fetchDatos();
  }, []);

  return (
    <div className="mb-5">
      <h2 className="text-center">Preferencia de Notificaciones</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={datos}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis
            dataKey="estado"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis />
          <Tooltip formatter={(value) => `${value} personas`} />
          <Legend />
          <Bar dataKey="cantidad" fill="#0088FE" name="Cantidad" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NotificacionesCongreso;
