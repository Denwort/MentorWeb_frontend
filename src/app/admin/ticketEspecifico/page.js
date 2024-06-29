'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TicketEspecifico() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('id');
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comentario, setComentario] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showAcceptForm, setShowAcceptForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (ticketId) {
      obtenerTicketEspecifico(ticketId);
    }
  }, [ticketId]);

  const obtenerTicketEspecifico = async (ticketId) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/ticket/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'ticket_id': ticketId }),
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

  const aceptarTicket = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/aceptar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'ticket_id': ticketId, 'comentario': comentario, 'nombre': nombre, 'descripcion': descripcion }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Ticket aceptado: ', data);
        router.push('/admin/tickets');
        setTicket(prevTicket => ({ ...prevTicket, estado: 'Aceptado', comentario, asunto: nombre, descripcion }));
      } else {
        const error = await response.text();
        console.log('Error al aceptar el ticket: ', error);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const rechazarTicket = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/rechazar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'ticket_id': ticketId, 'comentario': comentario }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Ticket rechazado: ', data);
        router.push('/admin/tickets');
        setTicket(prevTicket => ({ ...prevTicket, estado: 'Rechazado', comentario }));
      } else {
        const error = await response.text();
        console.log('Error al rechazar el ticket: ', error);
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleAcceptClick = () => {
    setShowAcceptForm(true);
    setShowRejectForm(false);
  };

  const handleRechazarClick = () => {
    setShowRejectForm(true);
    setShowAcceptForm(false);
  };

  const getFileName = (filePath) => {
    return filePath.split('/').pop();
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      {isLoading ? (
        <p>Cargando ticket...</p>
      ) : ticket ? (
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 w-full max-w-7xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{ticket.asunto}</h2>
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

          <div className="mt-4">
            {ticket.estado === 'Pendiente' && !showAcceptForm && !showRejectForm && (
              <div className="flex space-x-4">
                <button
                  onClick={handleAcceptClick}
                  className="mt-4 py-2 px-4 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                >
                  Aceptar
                </button>
                <button
                  onClick={handleRechazarClick}
                  className="mt-4 py-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                >
                  Rechazar
                </button>
                <Link href="/admin/tickets">
                  <button className="mt-4 py-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
                    Volver
                  </button>
                </Link>
              </div>
            )}

            {showAcceptForm && (
              <>
                <input
                  placeholder="Nombre del documento"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <textarea
                  placeholder="Comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <textarea
                  placeholder="Descripción del documento"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <button
                  onClick={aceptarTicket}
                  className="mt-4 py-2 px-4 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                >
                  Confirmar Aceptación
                </button>
              </>
            )}

            {showRejectForm && (
              <>
                <textarea
                  placeholder="Comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <button
                  onClick={rechazarTicket}
                  className="mt-4 py-2 px-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                >
                  Confirmar Rechazo
                </button>
              </>
            )}

            {(ticket.estado !== 'Pendiente' || showAcceptForm || showRejectForm) && (
              <Link href="/admin/tickets">
                <button className="mt-4 py-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
                  Volver
                </button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <p>No se pudo cargar la información del ticket.</p>
      )}
    </div>
  );
}
