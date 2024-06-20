'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';
import Link from 'next/link';

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [filtro, setFiltro] = useState('Pendientes');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 2;

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
      const response = await fetch('http://127.0.0.1:8000/tickets_todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'estudiante_id': 144 }),
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
        console.log('Data extraidaTODOSOK: ', data);
      } else {
        const error = await response.text();
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
        console.log('Data extraidaPendientesNOTOK: ', error);
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener los tickets actuales para la página
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Cambiar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getFileName = (filePath) => {
    return filePath.split('/').pop();
  };

  return (
    <div className="flex-1 p-4">
      <h1 className="title" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
        Visualización de Tickets
      </h1>
      {/* Botones */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => { setFiltro('Todos'); setCurrentPage(1); }}
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
          onClick={() => { setFiltro('Pendientes'); setCurrentPage(1); }}
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
          currentTickets.length === 0 ? (
            <p>No hay tickets disponibles.</p>
          ) : (
            <div style={{ width: '80%', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
              {currentTickets.map(ticket => (
                <div key={ticket.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0', marginTop: '20px' }}>
                  <h3 style={{ marginBottom: '5px' }}>{ticket.asunto}</h3>
                  <p><strong>Periodo:</strong> {ticket.seccion.periodo.codigo}</p>
                  <p><strong>Curso:</strong> {ticket.seccion.curso.nombre}</p>
                  <p><strong>Sección:</strong> {ticket.seccion.codigo} - {ticket.seccion.profesor.nombres}</p>
                  <p><strong>Comentario:</strong> {ticket.comentario}</p>
                  <p><strong>Descripcion:</strong> {ticket.descripcion}</p>
                  <p><strong>Archivo:</strong> <a href={`http://127.0.0.1:8000${ticket.archivo}`} download>{getFileName(ticket.archivo)}</a></p>
                  <p><strong>Estado establecido:</strong> {ticket.estado}</p>
                  <Link href={`./ticketEspecifico?id=${ticket.id}`}>
                    <button style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                      Más información
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', padding: 0 }}>
            {pageNumbers.map(number => (
              <li key={number} style={{ margin: '0 5px' }}>
                <button
                  onClick={() => paginate(number)}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: currentPage === number ? '#007bff' : '#ddd',
                    color: currentPage === number ? '#fff' : '#000',
                    border: 'none',
                    borderRadius: '5px',
                  }}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
