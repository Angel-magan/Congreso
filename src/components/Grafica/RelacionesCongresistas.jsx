import { useEffect, useState } from "react";
import "aframe";
import { ForceGraph2D } from "react-force-graph";

const RelacionesCongresistas = () => {
  const [datos, setDatos] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/congresistas/relacionesCongresistas"
        );
        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();

        // Extraer nodos únicos con nombres
        const nodosUnicos = {};
        data.forEach(({ source, source_name, target, target_name }) => {
          nodosUnicos[source] = { id: source, name: source_name };
          nodosUnicos[target] = { id: target, name: target_name };
        });

        // Formatear los datos para el gráfico
        const formattedData = {
          nodes: Object.values(nodosUnicos),
          links: data.map(({ source, target, relation }) => ({
            source,
            target,
            label: relation,
          })),
        };

        setDatos(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setLoading(false);
      }
    };

    fetchDatos();
  }, []);

  if (loading) return <p>Cargando gráfico...</p>;

  return (
    <div className="mb-5">
      <h2 className="text-center">Relaciones Entre Congresistas</h2>
      <ForceGraph2D
        graphData={datos}
        nodeLabel="name"
        nodeAutoColorBy="id"
        linkDirectionalParticles={2}
        linkCurvature={0.2}
        linkLabel="label"
      />
    </div>
  );
};

export default RelacionesCongresistas;
