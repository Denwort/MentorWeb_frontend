'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/navigation'

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

  const { cuenta, setCuenta } = useMiProvider();
  const router = useRouter(); // Inicializar useRouter

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

  return (
    <div className="flex-1 p-4">
        <div className="flex-container" style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', marginBottom: '20px' }}>
            {/* Primer bloque (Rellenar) */}
            <div className="containerRellenar" style={{ width: '435px', margin: '10px', backgroundColor: '#f0f0f0', marginLeft: '50px'}}>
                <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#858585', marginBottom: '20px', textAlign: 'center'}}>
                    Creación de ticket
                </h2>

                <div style={{ marginBottom: '20px', width: '170px', paddingLeft: '40px'}}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Periodo:</label>
                    <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} onBlur={handleObtenerPeriodos} style={{ width: '350px' }}>
                        <option value="">Selecciona un periodo</option>
                        {periodos.map((p) => (
                            <option key={p.id} value={p.id}>{p.codigo}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '20px', width: '170px', paddingLeft: '40px'}}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Curso:</label>
                    <select value={curso} onChange={(e) => setCurso(e.target.value)} onBlur={handleObtenerSecciones} style={{ width: '350px' }}>
                        <option value="">Selecciona un curso</option>
                        {cursos.map((c) => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </select>
                </div>

                <form onSubmit={handleCrearTicket} style={{width: '190px'}}>
                    <div style={{ marginBottom: '20px', paddingLeft: '40px'}}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Sección:</label>
                        <select value={seccion} onChange={(e) => setSeccion(e.target.value) } style={{ width: '350px' }}>
                            <option value="">Selecciona una sección</option>
                            {secciones.map((s) => (
                                <option key={s.id} value={s.id}>{s.codigo} - {s.profesor.nombres}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginBottom: '20px', paddingLeft: '40px'}}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Asunto:</label>
                        <input type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} style={{ width: '350px', display: 'center' }} />
                    </div>

                    <div style={{ marginBottom: '20px', paddingLeft: '40px'}}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Comentario:</label>
                        <input type="text" value={comentario} onChange={(e) => setComentario(e.target.value)} style={{ width: '350px' }} />
                    </div>
                    <div style={{ marginBottom: '20px', paddingLeft: '40px'}}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Descripcion:</label>
                        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} style={{ width: '350px' }} />
                    </div>
                    <div style={{paddingLeft: '125px', paddingTop: '30px'}}>
                    <button type="submit" style={{ backgroundColor: '#ff6440', borderRadius: '50px', padding: '15px', color: 'white', width: '160px' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Subiendo...' : 'Subir'}
                    </button>
                    </div>
                </form>
            </div>

            {/* Segundo bloque (Loddel PDF) */}
            <div className="containerPDF" style={{ width: '400px', marginLeft: '10px', backgroundColor: '#f0f0f0', alignItems: 'center', marginRight: '50px'}}>
                <div>
                <input type="file" onChange={(e) => {
                    setArchivo(e.target.files[0])
                    setNombreArchivo(e.target.files[0].name);
                }} />
                    <label style={{ display: 'block', marginBottom: '10px', marginTop: '10px' }}>Visualización del archivo:</label>
                    <embed src={archivo ? URL.createObjectURL(archivo) : ''} type="application/pdf" width="100%" height="500px" />
                    <div style={{ border: '2px solid black', padding: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', marginTop: '10px' }}>Nombre del archivo: {nombreArchivo}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
