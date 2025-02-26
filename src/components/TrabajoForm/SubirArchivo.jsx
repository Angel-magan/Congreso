import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
    auth: '',
});

const SubirArchivo = ({ archivo, onArchivoSubido }) => {
    const [urlArchivo, setUrlArchivo] = useState('');
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
            let nombreArchivo = archivo.name;
            let contador = 1;
            let existeArchivo = true;

            // Verificar si el archivo ya existe y generar un nuevo nombre si es necesario
            while (existeArchivo) {
                try {
                    await octokit.repos.getContent({
                        owner: 'maicol-monge',
                        repo: 'ArchivosCongreso',
                        path: nombreArchivo,
                    });
                    // Si llegamos aquí, el archivo ya existe
                    const partesNombre = archivo.name.split('.');
                    const extension = partesNombre.pop();
                    const nombreBase = partesNombre.join('.');
                    nombreArchivo = `${nombreBase}(${contador}).${extension}`;
                    contador++;
                } catch (err) {
                    // Si ocurre un error, significa que el archivo no existe
                    existeArchivo = false;
                }
            }

            const contenido = await archivo.arrayBuffer();
            const contenidoBase64 = btoa(String.fromCharCode(...new Uint8Array(contenido)));

            const respuesta = await octokit.repos.createOrUpdateFileContents({
                owner: 'maicol-monge',
                repo: 'ArchivosCongreso',
                path: nombreArchivo,
                message: 'Subir archivo',
                content: contenidoBase64,
                committer: {
                    name: 'CICMA',
                    email: 'maicol.monge@catolica.edu.sv',
                },
                author: {
                    name: 'Maicol Monge',
                    email: 'maicol.monge@catolica.edu.sv',
                },
            });

            const url = respuesta.data.content.html_url;
            setUrlArchivo(url);
            onArchivoSubido({ url: url, error: null });
            console.log('Archivo subido exitosamente');
        } catch (err) {
            console.error('Error al subir archivo:', err);
            setError(err);
            onArchivoSubido({ url: null, error: err });
        } finally {
            setCargando(false);
        }
    };

    if (cargando) {
        return <p>Subiendo archivo...</p>;
    }

    if (error) {
        return <p>Error al subir el archivo: Intenta subirlo nuevamente</p>;
    }

    return null;
};

export default SubirArchivo;