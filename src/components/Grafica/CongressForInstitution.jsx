import { useState, useEffect } from "react";
//Libreria para graficas
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CongressForInstitution = () => {
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/congresistas/instituciones"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDatosGrafico(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  if (loading) return <p>Cargando datos del gráfico...</p>;
  if (error) return <p>Error al cargar los datos del gráfico: {error}</p>;

  return (
    <div className="mb-5">
      <h2 className="text-center">Cantidad de Congresistas por Institución</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={datosGrafico}
          width={datosGrafico.length * 100} // Ajuste dinámico del ancho
          height={400}
        >
          <XAxis
            dataKey="institucion"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={170}
          />
          <YAxis
            tickFormatter={(value) => Math.round(value)}
            allowDecimals={false}
          />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#EABC54" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CongressForInstitution;
