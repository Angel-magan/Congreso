import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#FF6B6B"];

const EstadoTrabajos = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/estadoTrabajos"
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
      <h2 className="text-center">Estado de los Trabajos</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={datos}
            dataKey="cantidad"
            nameKey="estado"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {datos.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} trabajos`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EstadoTrabajos;
