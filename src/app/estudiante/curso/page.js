'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context';
import React from 'react';

export default function RepositorioCurso() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    // Esto para saber que usuario esta logeado
    const { cuenta, setCuenta } = useMiProvider();
    const estudiante_id = cuenta.persona.id;

    const [curso, setCurso] = useState(null);

    const handleConsulta = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/documentos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "curso_id": id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setCurso(data);
                console.log(data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleConsulta();
    }, []);

    return (
        <div className="pt-8">
            {curso ? (
                <>
                    {/* parte de la informacion del curso seleccionado */}
                    <div className='flex justify-center items-center'>
                        <h1>{curso.nombre}</h1>
                    </div>

                    {/* Parte de las secciones que existen */}
                    <div className='flex flex-col'>
                        {curso.secciones.map((secciones) => (
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
                </>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <p>Cargando curso...</p>
                </div>
            )}
        </div>
    );
}