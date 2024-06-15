'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context';
import React from 'react';
import cursoDB from "../../../api/documentos.js";

export default function RepositorioCurso() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    // Esto para saber que usuario esta logeado
    //const { cuenta, setCuenta } = useMiProvider();
    //const estudiante_id = cuenta.persona.id;

    const [resultados, setResultados] = useState(null);

    const handleOnLoad = async () => {
        const documentosData = await cursoDB.findAll({ curso_id: id }); //Aun no implementan GET
        setResultados(documentosData);
    };

    useEffect(() => {
        handleOnLoad();
    }, [id]);

    if (resultados == null) {
        return <div className='flex flex-col justify-center items-center'><p>Cargando documentos...</p></div>;
    }

    return (
        <div className="pt-8">
            {/* parte de la informacion del curso seleccionado */}
            <div className='flex justify-center items-center'>
                <h1>{resultados.nombre}</h1>
            </div>

            {/* Parte de las secciones que existen */}
            <div className='flex flex-col'>
                {resultados.secciones.map((secciones) => (
                    <div key={secciones.id} className='flex flex-wrap'>
                        <p>{secciones.codigo}</p>
                        {secciones.documentos.length !== 0
                            ? secciones.documentos.map((documentos) => (
                                <div key={documentos.id}>
                                    <p>{documentos.nombre}</p>
                                </div>
                            ))
                            : null}
                    </div>
                ))}
            </div>
        </div>
    );
}