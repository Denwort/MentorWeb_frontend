'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context.js';
import { useRouter } from "next/navigation";

export default function TicketEspecifico() {
  const { cuenta, setCuenta } = useMiProvider();
  const router = useRouter();
  const estudiante_id = cuenta.persona.id;
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTicket] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 4; //Ccantidad de tickets por pagina

  //esto es lo de siempre
  useEffect(() => {
    if (estudiante_id) {
      obtenerTicketEspecifico(estudiante_id);
    }
  }, [estudiante_id]);

  const obtenerTicketEspecifico = async (estudiante_id) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/tickets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'estudiante_id': estudiante_id }),
      });

      if (response.ok) {
        const data = await response.json();
        setTicket(data);
        console.log('Data extraidaOK: ', data);
      } else {
        const error = await response.text();
        console.log('Data extraidaNOTOK: ', error);
      }
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const getFileName = (filePath) => {
    return filePath.split('/').pop();
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //los calculos para displayar el numero de tickets
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  //para cerar el numero de paginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <div
        onClick={() => handleNavigation("/estudiante/ticket")}
        className="cursor-pointer bg-orange-500 text-white py-3 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 flex justify-center items-center mb-8 shadow-lg"
      >
        <span className="truncate font-bold">Crear ticket</span>
      </div>

      {isLoading ? (
        <p>Cargando tickets...</p>
      ) : (
        <div className="w-full max-w-7xl">
          {/* Tikcets */}
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
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron tickets para este estudiante.</p>
            )}
          </div>

          {/* Paginacion */}
          <div className="flex justify-center mt-4 space-x-2">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => handleClick(number)}
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
