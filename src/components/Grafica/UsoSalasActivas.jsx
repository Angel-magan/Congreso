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
          horario: item.horario,
          sesiones_activas: parseInt(item.sesiones_activas, 10) || 0,
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
          <XAxis dataKey="horario" padding={{ left: 40, right: 20 }} />
          <YAxis
            tickFormatter={(value) => Math.round(value)}
            allowDecimals={false}
          />
          <Tooltip />
          <Line type="monotone" dataKey="sesiones_activas" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsoSalasCongreso;
