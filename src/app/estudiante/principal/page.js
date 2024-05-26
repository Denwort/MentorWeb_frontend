'use client'
import { useMiProvider } from '/src/context/context.js';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from "next/image";

const obtenerAsesoriasEstudiante = async (id) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/asesorias_estudiante/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "estudiante_id": id }),
    });
    if (!response.ok) {
      throw new Error(`Error al obtener las asesorías del estudiante: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener las asesorías del estudiante:', error.message);
    throw error;
  }
};

const AsesoriasEstudianteCards = () => {

  const { cuenta, setCuenta } = useMiProvider();

  const estudiante_id = cuenta.persona.id

  const [asesoriasData, setAsesoriasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerAsesoriasEstudiante(estudiante_id);
        let ordenado = data.sort((a, b) => {
          return new Date(a.asesoria.fecha_inicio) - new Date(b.asesoria.fecha_inicio);
        });
        setAsesoriasData(ordenado);
      } catch (error) {
        console.error('Error al obtener las asesorías del estudiante:', error.message);
      }
    };

    fetchData();
  }, []);

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
  
    return [`Día: ${dayOfWeek} ${day} de ${month}`, `Hora: ${startTime}-${endTime}`];
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-xl font-bold mb-5">Asesorías próximas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {asesoriasData.map((asesoriaMAIN) => (
          <div key={asesoriaMAIN.id} className="bg-white shadow-md rounded-lg overflow-hidden relative p-5">
            <div className="flex items-center mb-5">
              <div className="relative w-24 h-24 mr-5">
                <Image
                  className="absolute rounded-full border-8 border-orange-500"
                  src={asesoriaMAIN.asesoria.seccion.profesor.foto}
                  alt="foto"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">{asesoriaMAIN.asesoria.seccion.profesor.nombres}</h3>
                <h1 className="text-base font-semibold mb-2">{asesoriaMAIN.asesoria.seccion.curso.nombre}</h1>
                <p className="text-sm md:text-base text-gray-600 mb-1">{obtenerFechayHora(asesoriaMAIN.asesoria.fecha_inicio, asesoriaMAIN.asesoria.fecha_fin)[0]}</p>
                <p className="text-sm md:text-base text-gray-600 mb-1">{obtenerFechayHora(asesoriaMAIN.asesoria.fecha_inicio, asesoriaMAIN.asesoria.fecha_fin)[1]}</p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-orange-500 rounded-lg py-2 px-4 text-white absolute bottom-2 right-2">
              <a href={asesoriaMAIN.asesoria.enlace} target="_blank" rel="noopener noreferrer">
                Ingresar
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default AsesoriasEstudianteCards;
