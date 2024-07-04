'use client';
import { useState } from 'react';
import { useMiProvider } from '/src/context/context.js';
import { useRouter, useParams } from 'next/navigation';

const AgregarHorario = () => {
  const { cuenta } = useMiProvider();
  const router = useRouter();
  const { seccionId } = useParams();
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [ambiente, setAmbiente] = useState('');
  const [enlace, setEnlace] = useState('');

  const handleAgregar = async () => {
    const fechaHoraInicio = `${fechaInicio}T${horaInicio}:00Z`;
    const fechaHoraFin = `${fechaFin}T${horaFin}:00Z`;

    console.log({
      seccion_id: seccionId,
      fecha_inicio: fechaHoraInicio,
      fecha_fin: fechaHoraFin,
      ambiente,
      enlace,
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/abrir_extra/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seccion_id: seccionId,
          fecha_inicio: fechaHoraInicio,
          fecha_fin: fechaHoraFin,
          ambiente,
          enlace,
        }),
      });

      if (response.ok) {
        alert('Horario agregado exitosamente');
        router.push('/profesor/principal');
        console.log("Data enviada: ", response);
      } else {
        const error = await response.text();
        alert('Error al agregar horario: ' + error);
      }
    } catch (error) {
      console.error('Error al agregar horario:', error);
      alert('Error al agregar horario');
    }
  };

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
    const fechaHoraInicio = `${e.target.value}T${horaInicio}:00Z`;
    console.log("Fecha y Hora de Inicio:", fechaHoraInicio);
  };

  const handleHoraInicioChange = (e) => {
    setHoraInicio(e.target.value);
    const fechaHoraInicio = `${fechaInicio}T${e.target.value}:00Z`;
    console.log("Fecha y Hora de Inicio:", fechaHoraInicio);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
    const fechaHoraFin = `${e.target.value}T${horaFin}:00Z`;
    console.log("Fecha y Hora de Fin:", fechaHoraFin);
  };

  const handleHoraFinChange = (e) => {
    setHoraFin(e.target.value);
    const fechaHoraFin = `${fechaFin}T${e.target.value}:00Z`;
    console.log("Fecha y Hora de Fin:", fechaHoraFin);
  };

  const handleAmbienteChange = (e) => {
    setAmbiente(e.target.value);
    console.log("Ambiente:", e.target.value);
  };

  const handleEnlaceChange = (e) => {
    setEnlace(e.target.value);
    console.log("Enlace:", e.target.value);
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Agregar Horario de Asesoría</h2>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Fecha de Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block mb-2 text-gray-700">Hora de Inicio:</label>
          <input
            type="time"
            value={horaInicio}
            onChange={handleHoraInicioChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Fecha de Fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={handleFechaFinChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block mb-2 text-gray-700">Hora de Fin:</label>
          <input
            type="time"
            value={horaFin}
            onChange={handleHoraFinChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Ambiente:</label>
          <input
            type="text"
            value={ambiente}
            onChange={handleAmbienteChange}
            placeholder="Introduce el ambiente"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Enlace:</label>
          <input
            type="text"
            value={enlace}
            onChange={handleEnlaceChange}
            placeholder="Introduce el enlace"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAgregar}
          className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default AgregarHorario;
