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
            const response = await fetch('http://127.0.0.1:8000/curso/', {
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
            } else {
                const error = await response.text();
                alert(error.length < 100 ? error: 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleConsulta();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center pt-8">
            {curso ? (
                <>
                    <h1>{curso.nombre}</h1> {/* Asumiendo que curso tiene un nombre */}
                    <p>ID del curso: {curso.id}</p>
                    {/* Renderiza otras propiedades del curso según sea necesario */}
                </>
            ) : (
                <p>Cargando curso...</p>
            )}
        </div>
    );
}