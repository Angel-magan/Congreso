import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CongresistasTrabajos = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/congresistas/congresistasTrabajos"
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
      <h2 className="text-center">Número de Trabajos por Congresista</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={datos}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <XAxis type="number" />
          <YAxis dataKey="nombre" type="category" />
          <Tooltip formatter={(value) => `${value} `} />
          <Bar
            dataKey="cantidad_congresistas"
            fill="#82ca9d"
            name="Trabajos Subidos"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CongresistasTrabajos;
