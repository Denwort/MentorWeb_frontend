'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';
import { useRouter } from 'next/navigation';

const SeccionesProfesor = () => {
  const { cuenta } = useMiProvider();
  const router = useRouter();
  const [secciones, setSecciones] = useState([]);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [curso, setCurso] = useState('');
  const [ambiente, setAmbiente] = useState('');

  // Estructura para la futura función de fetch
  const obtenerSeccionesProfesor = async (profesor_id) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/obtener_secciones_profesor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profesor_id }),
      });

      if (response.ok) {
        const data = await response.json();
        setSecciones(data);
        console.log('Secciones obtenidas: ', data);
      } else {
        const error = await response.text();
        console.error('Error al obtener secciones: ', error);
      }
    } catch (error) {
      console.error('Error al obtener secciones: ', error);
    }
  };

  useEffect(() => {
    // Simulación con datos de prueba hasta que la función de fetch esté disponible
    const datosPrueba = [
      {
        id: 1,
        nombreSeccion: 'Sección 304',
        curso: 'Analítica Predictiva de Datos',
        periodo: '2024-1'
      },
      {
        id: 2,
        nombreSeccion: 'Sección 305',
        curso: 'CALCULO II',
        periodo: '2024-1'
      }
    ];
    setSecciones(datosPrueba);

    //Descomenta resta linea cuando la función de fetch este disponible
    //obtenerSeccionesProfesor(cuenta.persona.id);
  }, []);

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
        //Recargar la página o actualizar el estado para reflejar los cambios
        //obtenerSeccionesProfesor(cuenta.persona.id);
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
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">Secciones a Cargo</h2>
      <div className="space-y-4 mb-10">
        {secciones.map((seccion) => (
          <div key={seccion.id} className="bg-white shadow-md rounded-lg overflow-hidden p-5">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{seccion.nombreSeccion}</h3>
                <p className="text-sm text-gray-600">{seccion.nombreCurso}</p>
              </div>
              <span className="text-sm text-gray-500">{seccion.estado}</span>
            </div>
            <div className="text-sm text-gray-500">
              <span className="mr-2">{seccion.profesor}</span>
              <details className="inline">
                <summary className="cursor-pointer text-blue-500">Más información</summary>
                <div className="mt-2">
                  <p><strong>Curso:</strong> {seccion.curso}</p>
                  <p><strong>Periodo:</strong> {seccion.periodo}</p>
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionesProfesor;
