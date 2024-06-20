'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/navigation'

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
  const router = useRouter(); // Inicializar useRouter

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
        body: JSON.stringify({ 'ticket_id': ticketId, 'comentario': comentario, 'nombre': nombre, 'descripcion': descripcion }), //Para pasar lo que pide la funcion
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Ticket aceptado: ', data);
        router.push('/admin/tickets'); // Redirigir después de una subida exitosa
        // Actualizar el estado del ticket después de aceptar
        setTicket(prevTicket => ({ ...prevTicket, estado: 'Aceptado', comentario, asunto: nombre, descripcion })); //Para que cambie el asunto del ticket
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
        router.push('/admin/tickets'); // Redirigir después de una subida exitosa
        // Actualizar el estado del ticket después de rechazar
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

  return (
    <div className="flex-1 p-4">
      {isLoading ? (
        <p>Cargando ticket...</p>
      ) : ticket ? (
        <div style={{ width: '80%', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '10px' }}>{ticket.asunto}</h2>
          <p><strong>Periodo:</strong> {ticket.seccion.periodo.codigo}</p>
          <p><strong>Curso:</strong> {ticket.seccion.curso.nombre}</p>
          <p><strong>Sección:</strong> {ticket.seccion.codigo} - {ticket.seccion.profesor.nombres}</p>
          <p><strong>Comentario:</strong> {ticket.comentario}</p>
          <p><strong>Descripcion:</strong> {ticket.descripcion}</p>
          <p><strong>Archivo:</strong> {ticket.archivo}</p>
          <p><strong>Fecha de Envío:</strong> {new Date(ticket.fecha_envio).toLocaleString()}</p>
          <p><strong>Estado establecido:</strong> {ticket.estado}</p>

          <div style={{ marginTop: '20px' }}>
            {ticket.estado === 'Pendiente' && !showAcceptForm && !showRejectForm && (
              <>
                <button
                  onClick={handleAcceptClick}
                  style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', marginRight: '10px' }}
                >
                  Aceptar
                </button>
                <button
                  onClick={handleRechazarClick}
                  style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px' }}
                >
                  Rechazar
                </button>
                <Link href="/admin/tickets">
                  <button style={{ marginLeft: '10px', marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
                    Volver
                  </button>
                </Link>
              </>
            )}

            {showAcceptForm && (
              <>
                <input
                  placeholder="Nombre del documento"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <textarea
                  placeholder="Comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <textarea
                  placeholder="Descripción del documento"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button
                  onClick={aceptarTicket}
                  style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', marginRight: '10px' }}
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
                  style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
                <button
                  onClick={rechazarTicket}
                  style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', marginRight: '10px' }}
                >
                  Confirmar Rechazo
                </button>
              </>
            )}

            {(ticket.estado !== 'Pendiente' || showAcceptForm || showRejectForm) && (
              <Link href="/admin/tickets">
                <button style={{ marginLeft: '10px', marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
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
