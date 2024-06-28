'use client';
import { useState } from 'react';
import { useMiProvider } from '/src/context/context.js';
import { useRouter } from 'next/navigation';

const AgregarHorario = () => {
  const { cuenta } = useMiProvider();
  const router = useRouter();
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [curso, setCurso] = useState('');
  const [ambiente, setAmbiente] = useState('');

  const handleAgregar = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/agregar_horario/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profesor_id: cuenta.persona.id,
          fecha,
          hora,
          curso,
          ambiente,
        }),
      });

      if (response.ok) {
        alert('Horario agregado exitosamente');
        router.push('/profesor/principal');
      } else {
        const error = await response.text();
        alert('Error al agregar horario: ' + error);
      }
    } catch (error) {
      console.error('Error al agregar horario:', error);
      alert('Error al agregar horario');
    }
  };

  return (
    <div className=" flex items-center justify-center p-24">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Agregar Horario de Asesoría</h2>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Curso:</label>
          <input
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            placeholder="Introduce el nombre del curso"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Ambiente:</label>
          <input
            type="text"
            value={ambiente}
            onChange={(e) => setAmbiente(e.target.value)}
            placeholder="Introduce el ambiente"
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
