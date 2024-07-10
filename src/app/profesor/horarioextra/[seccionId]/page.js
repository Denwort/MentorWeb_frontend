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

    if (!fechaInicio || !horaInicio || !horaFin || !ambiente || !enlace) {
      alert('Rellenar campos vacíos');
      return;
    }

    if (new Date(fechaHoraInicio) < new Date()) {
      alert('La fecha y hora de inicio deben ser posteriores a la fecha y hora actuales');
      return;
    }

    if (new Date(fechaHoraFin) <= new Date(fechaHoraInicio)) {
      alert('La hora de fin debe ser mayor a la hora de inicio');
      return;
    }

    const fechaInicioDate = new Date(fechaInicio);
    const startAcademicCycle1 = new Date('2024-04-01');
    const endAcademicCycle1 = new Date('2024-08-05');
    const startAcademicCycle2 = new Date('2024-08-15');
    const endAcademicCycle2 = new Date('2024-12-15');

    if (!(
        (fechaInicioDate >= startAcademicCycle1 && fechaInicioDate <= endAcademicCycle1) ||
        (fechaInicioDate >= startAcademicCycle2 && fechaInicioDate <= endAcademicCycle2)
      )) {
      alert('Ingresa fechas dentro del ciclo académico');
      return;
    }

    const ulimaZoomPattern = /^https:\/\/ulima-edu-pe\.zoom\.us\/j\/\d+$/;
    if (!ulimaZoomPattern.test(enlace)) {
      alert('El enlace de Zoom debe ser creado por una cuenta ULima');
      return;
    }

    const ambientePattern = /^[a-zA-Z0-9-]+$/;
    if (!ambientePattern.test(ambiente)) {
      alert('Caracteres no válidos en el campo Ambiente');
      return;
    }

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
    const newFechaInicio = e.target.value;
    setFechaInicio(newFechaInicio);
    setFechaFin(newFechaInicio); // Set fechaFin the same as fechaInicio
    const fechaHoraInicio = `${newFechaInicio}T${horaInicio}:00Z`;
    console.log("Fecha y Hora de Inicio:", fechaHoraInicio);
  };

  const handleHoraInicioChange = (e) => {
    setHoraInicio(e.target.value);
    const fechaHoraInicio = `${fechaInicio}T${e.target.value}:00Z`;
    console.log("Fecha y Hora de Inicio:", fechaHoraInicio);
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
            min={new Date().toISOString().split('T')[0]} // Restricción de fecha mínima
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
            disabled
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
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
