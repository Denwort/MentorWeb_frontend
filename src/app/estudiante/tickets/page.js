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

  return (
    <div className="flex-1 p-4">
      <div
        onClick={() => handleNavigation("/estudiante/ticket")}
        className="cursor-pointer bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300 flex justify-center items-center"
      >
        <span className="truncate">Crear ticket</span>
      </div>

      {isLoading ? (
        <p>Cargando tickets...</p>
      ) : (
        <div style={{ width: '80%', margin: '0 auto' }}>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div key={ticket.id} style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', marginBottom: '20px', marginTop: '30px'}}>
                <h3>{ticket.asunto}</h3>
                <p><strong>Periodo:</strong> {ticket.seccion.periodo.codigo}</p>
                <p><strong>Curso:</strong> {ticket.seccion.curso.nombre}</p>
                <p><strong>Sección:</strong> {ticket.seccion.codigo} - {ticket.seccion.profesor.nombres}</p>
                <p><strong>Comentario:</strong> {ticket.comentario}</p>
                <p><strong>Archivo:</strong> {ticket.archivo}</p>
                <p><strong>Fecha de Envío:</strong> {new Date(ticket.fecha_envio).toLocaleString()}</p>
                <p><strong>Estado establecido:</strong> {ticket.estado}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron tickets para este estudiante.</p>
          )}
        </div>
      )}
    </div>
  );
}
