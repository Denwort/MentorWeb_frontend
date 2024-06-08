'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [filtro, setFiltro] = useState('Pendientes');
  const [isLoading, setIsLoading] = useState(true);

  //Lo que adminisrtra que funcion usar
  useEffect(() => {
    if (filtro === 'Todos') {
      obtenerTodosLosTickets();
    } else if (filtro === 'Pendientes') {
      obtenerTicketsPendientes();
    }
  }, [filtro]);

  const obtenerTodosLosTickets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/ ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'estudiante_id': 144 }), //creo que deberia preguntarle a david como obtener la informacion del estudiante, quiza usando una nueva funcion o preguntando si el ticket tiene el id del estudiante
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        console.log('Data extraidaTODOSOK: ', data);
      } else {
        const error = await response.text();
        //alert('Error en la carga de tickets: ' + (error.length < 100 ? error : 'Error'));
        console.log('Data extraidaTODOSNOTOK: ', error);
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerTicketsPendientes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/pendientes/', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        console.log('Data extraidaPendientesOK: ', data);
      } else {
        const error = await response.text();
        //alert('Error en la carga de tickets pendientes: ' + (error.length < 100 ? error : 'Error'));
        console.log('Data extraidaPendientesNOTOK: ', error);
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 p-4">
      <h1 className="title" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
        Visualización de Tickets
      </h1>
      {/*Botones*/}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setFiltro('Todos')}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: filtro === 'Todos' ? '#ff6440' : '#ddd',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro('Pendientes')}
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            backgroundColor: filtro === 'Pendientes' ? '#ff6440' : '#ddd',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Pendientes
        </button>
      </div>
      <div className="flex-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        {isLoading ? (
          <p>Cargando tickets...</p>
        ) : (
          filtro === 'Pendientes' && (
            tickets.length === 0 ? (
              <p>No hay tickets pendientes.</p>
            ) : (
              <div style={{ width: '80%', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
                {tickets.map(ticket => (
                  <div key={ticket.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0', marginTop: '20px' }}>
                    <h3 style={{ marginBottom: '5px' }}>{ticket.asunto}</h3>
                    <p><strong>Periodo:</strong> {ticket.seccion.periodo.codigo}</p>
                    <p><strong>Curso:</strong> {ticket.curso_nombre}</p>
                    <p><strong>Sección:</strong> {ticket.seccion.codigo} - {ticket.seccion.profesor.nombres}</p>
                    <p><strong>Comentario:</strong> {ticket.comentario}</p>
                    <p><strong>Archivo:</strong> {ticket.archivo}</p>
                    <p><strong>Fecha de Envío:</strong> {new Date(ticket.fecha_envio).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )
          )
        )}
      </div>
      <div className="flex-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        {isLoading ? (
          <p>Cargando tickets...</p>
        ) : (
          filtro === 'Todos' && (
            tickets.length === 0 ? (
              <p>No hay tickets disponibles.</p>
            ) : (
              <div style={{ width: '80%', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
                {tickets.map(ticket => (
                  <div key={ticket.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0', marginTop: '20px' }}>
                    <h3 style={{ marginBottom: '5px' }}>{ticket.asunto}</h3>
                    <p><strong>Periodo:</strong> {ticket.seccion.periodo.codigo}</p>
                    <p><strong>Curso:</strong> {ticket.curso_nombre}</p>
                    <p><strong>Sección:</strong> {ticket.seccion.codigo} - {ticket.seccion.profesor.nombres}</p>
                    <p><strong>Comentario:</strong> {ticket.comentario}</p>
                    <p><strong>Archivo:</strong> {ticket.archivo}</p>
                    <p><strong>Fecha de Envío:</strong> {new Date(ticket.fecha_envio).toLocaleString()}</p>
                    <p><strong>Estado establecido:</strong> {new Date(ticket.fecha_envio).toLocaleString()}</p> {/*Esto es lo que diferencia entre la pestaña de todos y la pestaña de pendientes*/}
                  </div>
                ))}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
