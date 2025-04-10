import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UsoSalasCongreso = () => {
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/sesiones/usoSalas"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Asegurar que los valores numéricos sean enteros
        const datosProcesados = data.map((item) => ({
          fecha: new Date(item.fecha).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
          }),
          salas_en_uso: parseInt(item.salas_en_uso, 10) || 0,
        }));

        setDatosGrafico(datosProcesados);
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
      <h2 className="text-center">Uso de Salas Durante el Congreso</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={datosGrafico}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" angle={-45} textAnchor="end" height={60} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="salas_en_uso"
            stroke="#00bcd4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsoSalasCongreso;
