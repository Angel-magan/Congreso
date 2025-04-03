import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TopTenAutores = () => {
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/topTenAutores"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Mapear datos asegurando claves únicas
        const datosFiltrados = data.map((item, index) => ({
          id: index, // Índice único
          nombre: item.nombre || "Desconocido",
          cantidad_trabajos: parseInt(item.cantidad_trabajos, 10) || 0,
        }));

        setDatosGrafico(datosFiltrados);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  if (loading) return <p>Cargando datos del gráfico...</p>;
  if (error) return <p>Error al cargar los datos del gráfico: {error}</p>;

  return (
    <div className="mb-5">
      <h2 className="text-center">
        Top 10 Autores con Más Trabajos Presentados
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={datosGrafico} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[0, "dataMax"]}
            allowDecimals={false}
            tickCount={10}
          />
          <YAxis dataKey="nombre" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad_trabajos" fill="#4DB3CE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopTenAutores;
