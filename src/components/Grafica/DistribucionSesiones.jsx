import { useEffect, useState } from "react";
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

const DistribucionTrabajosSesion = () => {
  const [datosGrafico, setDatosGrafico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/sesiones/distribucionSesiones"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Procesar datos para la gráfica
        const datosProcesados = data.map((item) => ({
          fecha_sesion: item.fecha_sesion, // Fecha en X
          id_sesion: parseInt(item.id_sesion, 10) || 0, // ID en Y
          cantidad_trabajos: parseInt(item.cantidad_trabajos, 10) || 0, // Trabajos en Y (apilado)
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
      <ResponsiveContainer width="100%" height={600}>
        <h2 className="text-center">Trabajos por Sesión</h2>
        <BarChart
          data={datosGrafico}
          margin={{ top: 20, right: 30, left: 20, bottom: 150 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="fecha_sesion"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => Math.round(value)}
            allowDecimals={false}
          />
          <Tooltip />
          <Legend />

          {/* Barras apiladas */}
          <Bar
            dataKey="id_sesion"
            stackId="a"
            fill="#8884d8"
            name="ID Sesión"
          />
          <Bar
            dataKey="cantidad_trabajos"
            stackId="a"
            fill="#82ca9d"
            name="Cantidad de Trabajos"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistribucionTrabajosSesion;

// import { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const DistribucionTrabajosSesion = () => {
//   const [datosGrafico, setDatosGrafico] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDatos = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/sesiones/distribucionSesiones"
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         // Procesar datos para agrupar por sesión
//         const datosProcesados = data.map((item, index) => ({
//           id_sesion: `Sesión ${item.id_sesion}`, // Convertimos ID en una etiqueta
//           fecha_sesion: item.fecha_sesion || `Sesión ${index + 1}`,
//           cantidad_trabajos: parseInt(item.cantidad_trabajos, 10) || 0,
//         }));

//         setDatosGrafico(datosProcesados);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchDatos();
//   }, []);

//   if (loading) return <p>Cargando datos del gráfico...</p>;
//   if (error) return <p>Error al cargar los datos del gráfico: {error}</p>;

//   return (
//     <div style={{ width: "100%", overflowX: "auto" }}>
//       <div style={{ width: `${datosGrafico.length * 100}px` }}>
//         <ResponsiveContainer width="100%" height={500}>
//           <h2 className="text-center mt-3 mb-5">Trabajos por Sesión</h2>
//           <BarChart
//             data={datosGrafico}
//             margin={{ top: 20, right: 30, left: 20, bottom: 150 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             {/* Eje X ahora muestra el ID de la sesión en lugar de la fecha */}
//             <XAxis
//               dataKey="id_sesion"
//               angle={-45}
//               textAnchor="end"
//               interval={0}
//               tick={{ fontSize: 12 }}
//             />
//             <YAxis
//               tickFormatter={(value) => Math.round(value)}
//               allowDecimals={false}
//             />
//             <Tooltip />
//             <Legend />

//             {/* Apilamos las barras usando stackId */}
//             <Bar dataKey="cantidad_trabajos" stackId="a" fill="#82ca9d" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default DistribucionTrabajosSesion;
