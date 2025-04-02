import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Configura Supabase con tus claves
const SUPABASE_URL = "https://xbfnefyndfqlspnyexsh.supabase.co";  // Reemplázalo con tu URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZm5lZnluZGZxbHNwbnlleHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MzI5OTQsImV4cCI6MjA1OTEwODk5NH0._NtmGEdvH-7EltxTvGJjWYWrX7gpJ_x469h2cv4TjBU";  // Reemplázalo con tu clave pública
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SubirArchivo = ({ archivo, onArchivoSubido }) => {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (archivo) {
            subirArchivo();
        }
    }, [archivo]);

    const subirArchivo = async () => {
        setCargando(true);
        setError(null);

        try {
            const nombreArchivo = `${Date.now()}-${archivo.name}`; // Evita archivos duplicados
            const { data, error } = await supabase.storage
                .from("congreso") // Nombre de tu bucket
                .upload(nombreArchivo, archivo, {
                    cacheControl: "3600",
                    upsert: false, // Evita sobrescribir archivos
                });

            if (error) throw error;

            // Obtener la URL pública del archivo
            const { data: publicUrlData } = supabase.storage
                .from("congreso")
                .getPublicUrl(nombreArchivo);

            const url = publicUrlData.publicUrl;
            onArchivoSubido({ url, error: null });
            console.log("Archivo subido exitosamente:", url);
        } catch (err) {
            console.error("Error al subir archivo:", err.message);
            setError("Error al subir el archivo. Intenta nuevamente.");
            onArchivoSubido({ url: null, error: err.message });
        } finally {
            setCargando(false);
        }
    };

    if (cargando) {
        return <p>Subiendo archivo...</p>;
    }

    if (error) {
        return <p>Error al subir el archivo: Intenta nuevamente</p>;
    }

    return null;
};

export default SubirArchivo;
