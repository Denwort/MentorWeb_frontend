'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';
import { useRouter } from 'next/navigation';

const SeccionesProfesor = () => {
  const { cuenta } = useMiProvider();
  const router = useRouter();
  const [secciones, setSecciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSecciones = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/profesor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profesor_id: cuenta.persona.id }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de secciones:", data);
        setSecciones(data.secciones); // Asignar directamente el array de secciones
      } else {
        const error = await response.text();
        alert('Error al obtener secciones: ' + error);
      }
    } catch (error) {
      console.error('Error al obtener secciones:', error);
      alert('Error al obtener secciones');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSecciones();
  }, []);

  const handleAgregarHorario = (seccionId) => {
    router.push(`/profesor/horarioextra/${seccionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-5">Seleccionar Sección</h2>
      {isLoading ? (
        <p>Cargando secciones...</p>
      ) : secciones.length === 0 ? (
        <p>No hay secciones asignadas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {secciones.map((seccion) => (
            <div key={seccion.id} className="bg-white shadow-md rounded-lg overflow-hidden p-5">
              <h3 className="text-lg font-bold mb-2">{seccion.curso.nombre}</h3>
              <p className="text-sm text-gray-600 mb-1">Sección: {seccion.codigo}</p>
              <p className="text-sm text-gray-600 mb-1">Periodo: {seccion.periodo.codigo}</p>
              <button 
                onClick={() => handleAgregarHorario(seccion.id)}
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Agregar Horario
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeccionesProfesor;
