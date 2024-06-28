"use client";
import { useMiProvider } from "/src/context/context.js";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const asesorias = [
  {
    fecha: "14-12-2024",
    hora: "14:05",
    curso: "Ciencias del Fracaso",
    ambiente: "Narnia",
    seccion: "666",
    reservas: [
      { nombre: "Alberto", orden: 1, atendido: false },
      { nombre: "Juancho", orden: 2, atendido: false },
    ],
  },
  {
    fecha: "15-12-2024",
    hora: "10:00",
    curso: "Soldadura de Manera",
    ambiente: "Hogwarts",
    seccion: "101",
    reservas: [
      { nombre: "Lucía", orden: 1, atendido: false },
      { nombre: "Pedro", orden: 2, atendido: false },
      { nombre: "Esteban", orden: 3, atendido: false },
    ],
  },
  {
    fecha: "16-12-2024",
    hora: "12:30",
    curso: "Historia espacial",
    ambiente: "Afganistan",
    seccion: "202",
    reservas: [
      { nombre: "Ana", orden: 1, atendido: false },
      { nombre: "Carlos", orden: 2, atendido: false },
    ],
  },
];

const PaginaPrincipalProfesor = () => {
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
              <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
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
                    {asesoria.reservas.map((reserva, index) => (
                      <li key={index} className="text-gray-600">
                        {reserva.orden}. {reserva.nombre}
                      </li>
                    ))}
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
};

export default PaginaPrincipalProfesor;
