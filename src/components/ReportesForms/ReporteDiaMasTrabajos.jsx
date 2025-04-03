import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Logo from "../../assets/images/imgpng.png";

const ReporteDiaMasTrabajos = () => {
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
    const [noDataMessage, setNoDataMessage] = useState(""); // Estado para manejar el mensaje de falta de datos

    const fetchDiaMasTrabajos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/sesiones/getDiaMasTrabajos");
            if (response.data.length === 0) {
                setNoDataMessage("No hay registros disponibles para este reporte.");
                setPdfBlobUrl(null); // Asegurarse de que no se muestre un PDF vacío
            } else {
                setNoDataMessage(""); // Limpiar el mensaje si hay datos
                generatePDF(response.data); // Generar el PDF automáticamente después de obtener los datos
            }
        } catch (error) {
            console.error("Error fetching día con más trabajos:", error);
            setNoDataMessage("Ocurrió un error al obtener los datos del reporte.");
        }
    };

    const generatePDF = (data) => {
        const doc = new jsPDF();
        doc.addImage(Logo, "PNG", 10, 10, 30, 30); // Agregar logo
        doc.setFontSize(18);
        doc.text("Reporte del Día con Más Trabajos Presentados", 50, 20);
        doc.setFontSize(13);
        const description = "Descripción: Reporte del día del congreso con más trabajos presentados.";
        const lines = doc.splitTextToSize(description, 160); // Divide el texto en líneas de máximo en ancho
        doc.text(lines, 25, 50);
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 30);

        // Generar tabla
        doc.autoTable({
            startY: 60,
            head: [["Fecha", "Cantidad de Trabajos"]],
            body: data.map((item) => [
                item.fecha,
                item.cantidad_trabajos,
            ]),
        });

        // Convertir el PDF a un Blob y generar una URL para el iframe
        const pdfBlob = doc.output("blob");
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        setPdfBlobUrl(pdfBlobUrl);
    };

    const downloadPDF = () => {
        if (pdfBlobUrl) {
            const link = document.createElement("a");
            link.href = pdfBlobUrl;
            link.download = "Reporte_Dia_Mas_Trabajos.pdf";
            link.click();
        }
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary fw-bold px-4"
                onClick={fetchDiaMasTrabajos}
            >
                Reporte del Día con Más Trabajos
            </button>

            {noDataMessage && (
                <div className="mt-4 alert alert-warning" role="alert">
                    {noDataMessage}
                </div>
            )}

            {pdfBlobUrl && (
                <div className="mt-4">
                    <h3>Vista Previa del Reporte</h3>
                    <iframe
                        src={pdfBlobUrl}
                        title="Vista Previa del Reporte"
                        style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
                    ></iframe>
                    <button
                        type="button"
                        className="btn btn-success fw-bold px-4 mt-3"
                        onClick={downloadPDF}
                    >
                        Descargar PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReporteDiaMasTrabajos;