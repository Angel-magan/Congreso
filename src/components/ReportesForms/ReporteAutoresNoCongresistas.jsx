import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Logo from "../../assets/images/imgpng.png";

const ReporteAutoresNoCongresistas = () => {
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
    const [noDataMessage, setNoDataMessage] = useState(""); // Estado para manejar el mensaje de falta de datos

    const fetchAutoresNoCongresistas = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/getAutoresNoCongresistas");
            if (response.data.length === 0) {
                setNoDataMessage("No hay registros disponibles para este reporte.");
                setPdfBlobUrl(null); // Asegurarse de que no se muestre un PDF vacío
            } else {
                setNoDataMessage(""); // Limpiar el mensaje si hay datos
                generatePDF(response.data); // Generar el PDF automáticamente después de obtener los datos
            }
        } catch (error) {
            console.error("Error fetching autores no congresistas:", error);
            setNoDataMessage("Ocurrió un error al obtener los datos del reporte.");
        }
    };

    const generatePDF = (data) => {
        const doc = new jsPDF();
        doc.addImage(Logo, "PNG", 10, 10, 30, 30); // Agregar logo
        doc.setFontSize(18);
        doc.text("Reporte de Autores que No Fueron Congresistas", 50, 20);
        doc.setFontSize(13);
        const description = "Descripción: Reporte detallado de todas las personas que son autores y no fueron congresistas.";
        const lines = doc.splitTextToSize(description, 160); // Divide el texto en líneas de máximo en ancho
        doc.text(lines, 25, 50);
        doc.setFontSize(14);
        doc.text("Descripción: Reporte detallado de todas las personas que son autores y no fueron congresistas.", 50, 20);
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 30);

        // Generar tabla
        doc.autoTable({
            startY: 60,
            head: [["Nombre", "Apellido", "Correo Electrónico"]],
            body: data.map((item) => [
                item.nombre,
                item.apellido,
                item.correo,
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
            link.download = "Reporte_Autores_No_Congresistas.pdf";
            link.click();
        }
    };

    return (
        <div>
            <button
                type="button"
                className="btn btn-primary fw-bold px-4"
                onClick={fetchAutoresNoCongresistas}
            >
                Reporte de Autores No Congresistas
            </button>

            {noDataMessage && (
                <div className="mt-4 alert alert-warning" role="alert">
                    {noDataMessage}
                </div>
            )}

            {pdfBlobUrl && (
                <div className="mt-4" style={{width:"1000px"}}>
                    <h3>Vista Previa del Reporte</h3>
                    <iframe
                        src={pdfBlobUrl}
                        title="Vista Previa del Reporte"
                        style={{ width: "300px", height: "500px", border: "1px solid #ccc" }}
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

export default ReporteAutoresNoCongresistas;