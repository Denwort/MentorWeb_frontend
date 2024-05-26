'use client';
import { useState } from 'react';

export default function UploadPage({ children }) {
  const [excel_secciones, setExcel_secciones] = useState(null);
  const [excel_asesorias, setExcel_asesorias] = useState(null);
  const [periodo, setPeriodo] = useState('');
  const [fecha_inicio, setFecha_inicio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('excel_secciones', excel_secciones);
    formData.append('excel_asesorias', excel_asesorias);
    formData.append('periodo', periodo);
    formData.append('fecha_inicio', fecha_inicio);

    try {
      const response = await fetch('http://127.0.0.1:8000/cargar/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Datos enviados:', data);
        alert('Archivos y datos enviados exitosamente');
      } else {
        const error = await response.text();
        alert('Error en el envío: ' + error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el envío');
    }
  };

  return (
    <div className="flex-1 p-4">
      <div className="container" style={{ padding: '20px' }}>
        <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#858585', marginBottom: '20px' }}>
          Subir Horarios
        </h2>
        <form onSubmit={handleSubmit}>
          {/*
          <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className="card" style={{ backgroundColor: "white", border: "2px solid purple", width: 'calc(20% - 10px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', position: 'relative', padding: '20px' }}>
              <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Hernan Nina SW2</h3>
              <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Miercoles</p>
              <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>2:00 pm - 3:00 pm</p>
              <img src="/horario1.jpg" alt="Horario 1" className="cardImage" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
            </div>
          </div>
          */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>excel_secciones:</label>
            <input type="file" onChange={(e) => setExcel_secciones(e.target.files[0])} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>excel_asesorias:</label>
            <input type="file" onChange={(e) => setExcel_asesorias(e.target.files[0])} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Periodo:</label>
            <input type="text" value={periodo} onChange={(e) => setPeriodo(e.target.value)} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Fecha de inicio del periodo:</label>
            <input type="date" value={fecha_inicio} onChange={(e) => setFecha_inicio(e.target.value)} />
          </div>
          <button type="submit" style={{ backgroundColor: '#ff6440', borderRadius: '10px', padding: '8px', color: 'white', width: '90px' }}disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}
