'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';
import { useRouter } from 'next/navigation';

export default function UploadPage({ children }) {
  const [periodo, setPeriodo] = useState('');
  const [curso, setCurso] = useState('');
  const [seccion, setSeccion] = useState('');
  const [periodos, setPeriodos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [asunto, setAsunto] = useState('');
  const [comentario, setComentario] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nombreArchivo, setNombreArchivo] = useState('');
  const [fileType, setFileType] = useState('');

  const { cuenta, setCuenta } = useMiProvider();
  const router = useRouter();

  const estudiante_id = cuenta.persona.id;

  useEffect(() => {
    handleObtenerPeriodos();
    handleObtenerCursos();
  }, []);

  const handleObtenerPeriodos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/obtener_periodos/', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setPeriodos(data);
      } else {
        const error = await response.text();
        alert('Error en la carga de periodos: ' + (error.length < 100 ? error : 'Error'));
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleObtenerCursos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/obtener_cursos/', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setCursos(data);
      } else {
        const error = await response.text();
        alert('Error en la carga de cursos: ' + (error.length < 100 ? error : 'Error'));
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleObtenerSecciones = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/buscar_seccion/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "periodo_id": periodo, "curso_id": curso }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data extraida: ', data);
        setSecciones(data);
      } else {
        const error = await response.text();
        alert('Error en la carga de secciones: ' + (error.length < 100 ? error : 'Error'));
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleCrearTicket = async (CT) => {
    CT.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('estudiante_id', estudiante_id);
    formData.append('seccion_id', seccion);
    formData.append('asunto', asunto);
    formData.append('comentario', comentario);
    formData.append('descripcion', descripcion);
    formData.append('archivo', archivo);

    try {
      const response = await fetch('http://127.0.0.1:8000/crear/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Datos enviados a funcion crear: ', data);
        alert('Archivos y datos enviados exitosamente');
        router.push('/estudiante/tickets'); // Redirigir después de una subida exitosa
      } else {
        const error = await response.text();
        alert('Error en el envío: ' + (error.length < 100 ? error : 'Error'));
      }
    } catch (error) {
      console.error('Error: ', error);
      alert('Error en el envío');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
    setNombreArchivo(file.name);
    setFileType(file.type);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Creación de ticket</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Primer bloque (Rellenar) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-5">
              <label className="block mb-2 text-gray-700">Periodo:</label>
              <select 
                value={periodo} 
                onChange={(e) => setPeriodo(e.target.value)} 
                onBlur={handleObtenerPeriodos} 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un periodo</option>
                {periodos.map((p) => (
                  <option key={p.id} value={p.id}>{p.codigo}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-gray-700">Curso:</label>
              <select 
                value={curso} 
                onChange={(e) => setCurso(e.target.value)} 
                onBlur={handleObtenerSecciones} 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un curso</option>
                {cursos.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>

            <form onSubmit={handleCrearTicket}>
              <div className="mb-5">
                <label className="block mb-2 text-gray-700">Sección:</label>
                <select 
                  value={seccion} 
                  onChange={(e) => setSeccion(e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona una sección</option>
                  {secciones.map((s) => (
                    <option key={s.id} value={s.id}>{s.codigo} - {s.profesor.nombres}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-gray-700">Asunto:</label>
                <input 
                  type="text" 
                  value={asunto} 
                  onChange={(e) => setAsunto(e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-gray-700">Comentario:</label>
                <input 
                  type="text" 
                  value={comentario} 
                  onChange={(e) => setComentario(e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-gray-700">Descripcion:</label>
                <input 
                  type="text" 
                  value={descripcion} 
                  onChange={(e) => setDescripcion(e.target.value)} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 shadow-lg" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subiendo...' : 'Subir'}
                </button>
              </div>
            </form>
          </div>

          {/* Segundo bloque (Carga del PDF) */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="mb-5"
            />
            <label className="block text-gray-700 mb-2">Visualización del archivo:</label>
            {fileType === 'application/pdf' || !fileType ? (
              <embed 
                src={archivo ? URL.createObjectURL(archivo) : ''} 
                type="application/pdf" 
                width="100%" 
                height="500px" 
                className="mb-5"
              />
            ) : (
              <p className="text-gray-500 mb-5">Archivo subido: {nombreArchivo}</p>
            )}
            <div className="border-2 border-gray-300 p-4 rounded-lg w-full text-center">
              <label className="block text-gray-700">Nombre del archivo: {nombreArchivo}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
