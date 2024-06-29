'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';
import Link from 'next/link';

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [filtro, setFiltro] = useState('Pendientes');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 4;

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
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-5">Visualización de Tickets</h1>
      <div className="flex justify-center mb-8">
        <button
          onClick={() => { setFiltro('Todos'); setCurrentPage(1); }}
          className={`py-2 px-4 rounded-l-full border-r-0 ${filtro === 'Todos' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Todos
        </button>
        <button
          onClick={() => { setFiltro('Pendientes'); setCurrentPage(1); }}
          className={`py-2 px-4 rounded-r-full ${filtro === 'Pendientes' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Pendientes
        </button>
      </div>

      {isLoading ? (
        <p>Cargando tickets...</p>
      ) : (
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {currentTickets.length > 0 ? (
              currentTickets.map(ticket => (
                <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{ticket.asunto}</h3>
                    <span className={`py-1 px-3 rounded-full text-sm ${
                      ticket.estado === 'Aceptado' ? 'bg-green-100 text-green-800' :
                      ticket.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.estado === 'Rechazado' ? 'bg-red-100 text-red-800' : ''
                    }`}>
                      {ticket.estado}
                    </span>
                  </div>
                  <div className="text-gray-700">
                    <p><strong>Periodo:</strong> {ticket.seccion.periodo.codigo}</p>
                    <p><strong>Curso:</strong> {ticket.seccion.curso.nombre}</p>
                    <p><strong>Sección:</strong> {ticket.seccion.codigo} - {ticket.seccion.profesor.nombres}</p>
                    <p><strong>Comentario:</strong> {ticket.comentario}</p>
                    <p><strong>Descripcion:</strong> {ticket.descripcion}</p>
                    <p><strong>Archivo:</strong> <a href={`http://127.0.0.1:8000${ticket.archivo}`} download className="text-blue-500 hover:underline">{getFileName(ticket.archivo)}</a></p>
                    <Link href={`./ticketEspecifico?id=${ticket.id}`}>
                      <button className="mt-4 py-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
                        Más información
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay tickets disponibles.</p>
            )}
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`py-2 px-4 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
