'use client'
import { useMiProvider } from '/src/context/context.js';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

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

  const [cuenta] = useMiProvider();

  const estudiante_id = cuenta.persona.id

  const [asesoriasData, setAsesoriasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerAsesoriasEstudiante(estudiante_id);
        setAsesoriasData(data);
      } catch (error) {
        console.error('Error al obtener las asesorías del estudiante:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="h-max">
        <div className="container p-5">
          <h2 className="text-xl font-bold mb-5">Asesorías próximas</h2>
          <div className="flex flex-wrap gap-5">
            {asesoriasData.map((asesoriaMAIN) => (
              <div key={asesoriaMAIN.id} className="w-[calc(30%-10px)] bg-white shadow-md rounded-lg overflow-hidden relative p-5">
                <div className="flex items-center">
                  <div className="relative w-24 h-24 mr-5 bg-gradient-to-r from-transparent to-white">
                    <div className="absolute w-full h-full rounded-full border-8 border-orange-500 clip-path-[polygon(0%_0%,100%_0%,100%_100%,0%_100%)]"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{asesoriaMAIN.asesoria.seccion.profesor.nombres}</h3>
                    <h1 className="text-base font-semibold mb-2">{asesoriaMAIN.asesoria.seccion.curso.nombre}</h1>
                    <p className="text-base text-gray-600 mb-1">{asesoriaMAIN.asesoria.fecha_inicio}</p>
                    <p className="text-base text-gray-600 mb-1">{asesoriaMAIN.asesoria.fecha_fin}</p>
                    <p className="text-base text-gray-600 mb-1">ID General: {asesoriaMAIN.id}</p>
                  </div>
                </div>
                <button className="bg-orange-500 rounded-lg py-2 px-4 text-white w-24 absolute bottom-2 right-2">Ingresar</button>
              </div>
            ))}
          </div>
        </div>
      </div>

  );
};

export default AsesoriasEstudianteCards;
