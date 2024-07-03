"use client";
import { useMiProvider } from "/src/context/context.js";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import listaReservasDB from "../../../api//reservasAsesoriasVistaProfesor.js";

export default function UserAsesores() {
  const [asesorias, setAsesorias] = useState([]);

  // Función para formatear la fecha
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Función para formatear la hora
  const formatearHora = (fechaISO) => {
    const fecha = new Date(fechaISO);
    // Ajustar diferencia horaria
    fecha.setHours(fecha.getHours() + 5);
    return fecha.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para transformar cada asesoría
  const transformarAsesoria = (objeto) => {
    const primeraAsesoria =
      objeto.asesorias.length > 0 ? objeto.asesorias[0] : null;

    if (!primeraAsesoria) {
      return null;
    }

    const fechaFormateada = formatearFecha(primeraAsesoria.fecha_inicio);
    const horaInicioFormateada = formatearHora(primeraAsesoria.fecha_inicio);
    const horaFinFormateada = formatearHora(primeraAsesoria.fecha_fin);

    return {
      fecha: fechaFormateada,
      hora_inicio: horaInicioFormateada,
      hora_fin: horaFinFormateada,
      curso: objeto.curso.nombre,
      ambiente: primeraAsesoria.ambiente,
      seccion: objeto.codigo,
      reservas: primeraAsesoria.reservas.map((reserva, index) => ({
        nombre: reserva.nombre,
        orden: index + 1,
        atendido: reserva.atendido || false,
      })),
    };
  };

  // Función principal para manejar la consulta
  const handleConsulta = async () => {
    try {
      const asesoresData = await listaReservasDB.findAll({
        profesor_id: 33,
      });

      const dataLimpia = asesoresData
        .map(transformarAsesoria)
        .filter((item) => item !== null);

      setAsesorias(dataLimpia);
      console.log(dataLimpia);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (asesorias == []) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>Cargando documentos...</p>
      </div>
    );
  }

  useEffect(() => {
    handleConsulta();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Asesorías Programadas
        </h1>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {asesorias.map((asesoria, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg px-6 py-5 border border-gray-300"
            >
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
                {asesoria.curso} - {asesoria.seccion}
              </h2>
              <div className="flex items-center">
                <div className="w-1/3">
                  <p className="text-gray-600">
                    <span className="font-medium">Fecha:</span> {asesoria.fecha}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Hora:</span> {asesoria.hora}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Ambiente:</span>{" "}
                    {asesoria.ambiente}
                  </p>
                </div>
                <div className="w-2/3">
                  <h3 className="text-xl font-semibold text-gray-700 mt-1">
                    Reservas:
                  </h3>
                  <ul className="list-disc list-inside ml-4">
                    {asesoria.reservas.map((reserva, index) => (
                      <li key={index} className="text-gray-600">
                        {reserva.orden}. {reserva.nombre}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
