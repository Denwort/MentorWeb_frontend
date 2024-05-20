'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context';
import Image from "next/image";
import React from 'react';

export default function Home() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [cuenta] = useMiProvider();

    const [asesor, setAsesor] = useState(null);

    const handleConsulta = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/profesor/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "profesor_id": id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAsesor(data);
                console.log(data);
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        handleConsulta();
    }, []);

    function obtenerCursos(lista) {
        if (!lista) return [];
        let elementosUnicos = new Set();
        for (let elemento of lista) {
            elementosUnicos.add(elemento.curso.nombre);
        }
        return Array.from(elementosUnicos);
    }

    function obtenerAsesorias(lista) {
        if (!lista) return [];
        let listaAsesorias = [];

        lista.forEach(seccion => {
            seccion.asesorias.forEach(asesoria => {
                let infoAsesoria = {
                    id: asesoria.id,
                    fecha_inicio: asesoria.fecha_inicio,
                    fecha_fin: asesoria.fecha_fin,
                    curso: seccion.curso.nombre,
                    ambiente: asesoria.ambiente,
                    enlace: asesoria.enlace
                };
                listaAsesorias.push(infoAsesoria);
            });
        });

        listaAsesorias.sort((a, b) => new Date(a.fecha_fin).getTime() - new Date(b.fecha_fin).getTime());
        console.log(listaAsesorias)
        return listaAsesorias;
    }

    function obtenerFechayHora(startDate, endDate) {
        const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      
        const start = new Date(startDate);
        const end = new Date(endDate);
      
        const dayOfWeek = daysOfWeek[start.getUTCDay()];
        const day = start.getUTCDate();
        const month = months[start.getUTCMonth()];

        const startTime = start.toISOString().substring(11, 16); // Extract HH:mm from ISO string
        const endTime = end.toISOString().substring(11, 16);     // Extract HH:mm from ISO string
      
        return [`${dayOfWeek} ${day} de ${month}`, `${startTime}-${endTime}`];
      }

    const handleReservar = async (asesoria_id) => {
        
        const estudiante_id = cuenta.persona.id

        try {
            const response = await fetch('http://127.0.0.1:8000/reservar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "estudiante_id": estudiante_id,
                    "asesoria_id": asesoria_id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Registro exitoso');
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center pt-8">
            {asesor && (
                <>
                    {/* Información del asesor */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden">
                            <Image
                                src={asesor.foto}
                                alt={"foto"}
                                width={1000}
                                height={1000}
                                layout="responsive"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 font-bold text-xl text-center">{asesor.nombres}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-center">
                            <div className="flex flex-wrap items-center justify-center w-full">
                                {obtenerCursos(asesor.secciones).map((curso, index) => (
                                    <div className="flex items-center justify-center m-2" key={index}>
                                        <div className="px-4 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                            <p className="text-white font-bold">{curso}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
    
                    {/* Lista de asesorías */}
                    {obtenerAsesorias(asesor.secciones).length != 0 && (
                        <div className="overflow-x-auto mt-8">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-2 px-4 text-sm font-semibold text-gray-700">ID</th>
                                        <th className="py-2 px-4 text-sm font-semibold text-gray-700">Fecha</th>
                                        <th className="py-2 px-4 text-sm font-semibold text-gray-700">Hora</th>
                                        <th className="py-2 px-4 text-sm font-semibold text-gray-700">Curso</th>
                                        <th className="py-2 px-4 text-sm font-semibold text-gray-700">Ambiente</th>
                                        <th className="py-2 px-4 text-sm font-semibold text-gray-700">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {obtenerAsesorias(asesor.secciones).map((asesoria, index) => (
                                        <tr key={index} className="border-t border-gray-200">
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">{asesoria.id}</td>
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                {obtenerFechayHora(asesoria.fecha_inicio, asesoria.fecha_fin)[0]}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">
                                                {obtenerFechayHora(asesoria.fecha_inicio, asesoria.fecha_fin)[1]}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">{asesoria.curso}</td>
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">{asesoria.ambiente}</td>
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900 flex items-center">
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-full mx-2 text-sm"
                                                    onClick={() => handleReservar(asesoria.id)}
                                                >
                                                    Reservar
                                                </button>
                                                <div className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-1.5 px-4 rounded-full mx-2 text-sm">
                                                    <a href={asesoria.enlace} target="_blank" rel="noopener noreferrer">
                                                        Ingresar
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
    
    
}
