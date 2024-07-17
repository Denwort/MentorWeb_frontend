'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const obtenerAsesoriasEstudiante = async (id) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/asesorias_estudiante/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "estudiante_id": id }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Asesorias recientes:', data); // Añadir esta línea para ver los datos
      return data;
    } else {
      throw new Error(`Error al obtener las asesorías del estudiante: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error al obtener las asesorías del estudiante:', error.message);
    throw error;
  }
};

const obtenerDocumentosRecientes = async (estudiante_id) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/recientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'estudiante_id': estudiante_id }),
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los documentos recientes: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los documentos recientes:', error.message);
    throw error;
  }
};

const AsesoriasEstudianteCards = () => {
  const { cuenta } = useMiProvider();
  const estudiante_id = cuenta.persona.id;
  const [asesoriasData, setAsesoriasData] = useState([]);
  const [documentosRecientes, setDocumentosRecientes] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const asesorias = await obtenerAsesoriasEstudiante(estudiante_id);
        let ordenado = asesorias.sort((a, b) => {
          return new Date(a.asesoria.fecha_inicio) - new Date(b.asesoria.fecha_inicio);
        });
        setAsesoriasData(ordenado);

        const documentos = await obtenerDocumentosRecientes(estudiante_id);
        console.log('Documentos recientes:', documentos);

        const documentosUnicos = Array.from(new Set(documentos.map(doc => doc.id)))
          .map(id => {
            return documentos.find(doc => doc.id === id);
          });
        setDocumentosRecientes(documentosUnicos.slice(0, 5));
      } catch (error) {
        console.error('Error al obtener los datos:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reload, estudiante_id]);

  const handleEliminarReservar = async (reserva_id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/reservarEliminar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "reserva_id": reserva_id,
        }),
      });

      if (response.ok) {
        console.log('Asesoria Eliminada');
        setReload(prev => !prev);
        setPopupMessage('Reserva eliminada exitosamente.');
      } else {
        const error = await response.text();
        alert(error);
        setPopupMessage(`Error: ${error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupMessage('Error al eliminar la reserva.');
    } finally {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const getFileName = (filePath) => {
    return filePath.split('/').pop();
  };

  function obtenerFechayHora(startDate, endDate) {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const start = new Date(startDate);
    const end = new Date(endDate);

    const dayOfWeek = daysOfWeek[start.getUTCDay()];
    const day = start.getUTCDate();
    const month = months[start.getUTCMonth()];

    const startTime = start.toISOString().substring(11, 16);
    const endTime = end.toISOString().substring(11, 16);

    return [`Día: ${dayOfWeek} ${day} de ${month}`, `Hora: ${startTime}-${endTime}`];
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-xl font-bold mb-5">Asesorías próximas</h2>
      {asesoriasData.length === 0 ? (
        <p>No hay asesorías seleccionadas recientemente.</p>
      ) : (
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
              <div className="flex flex-row-reverse space-x-4 space-x-reverse">
                <a href={asesoriaMAIN.asesoria.enlace} target="_blank" rel="noopener noreferrer" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg">
                  Ingresar
                </a>
                <button onClick={() => handleEliminarReservar(asesoriaMAIN.id)} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl font-bold mt-10 mb-5">Documentos vistos recientemente</h2>
      {documentosRecientes.length === 0 ? (
        <p>No hay documentos seleccionados recientemente.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {documentosRecientes.map((documento) => (
            <div key={documento.id} className="bg-white shadow-md rounded-lg overflow-hidden relative p-5">
              <div className="flex items-center mb-5">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{documento.nombre}</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-1">{documento.descripcion}</p>
                  <p className="text-sm md:text-base text-gray-600 mb-1">{documento.seccion.codigo} - {documento.seccion.curso.nombre}</p>
                  <a href={`http://localhost:8000${documento.archivo}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {getFileName(documento.archivo)}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-xl">{popupMessage}</p>
            <button onClick={() => setShowPopup(false)} className="mt-3 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsesoriasEstudianteCards;