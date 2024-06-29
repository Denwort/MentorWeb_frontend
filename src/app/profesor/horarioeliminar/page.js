"use client";
import { useMiProvider } from "/src/context/context.js";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Asesorias = [
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

export default function horarioExtraEliminar() {
  const [asesorias, setAsesorias] = useState(Asesorias);
  const [mostrarLista, setMostrarLista] = useState(true);

  const eliminarAsesoria = (index) => {
    const nuevasAsesorias = asesorias.filter((_, i) => i !== index);
    setAsesorias(nuevasAsesorias);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Eliminar Asesoría
        </h1>
        {mostrarLista && (<div>
          <ul>
            {asesorias.map((asesoria, index) => (
              <li key={index} className="flex items-center justify-between mb-4 p-4 border border-gray-300 rounded-lg bg-white">
                <div>
                  <p className="text-xl font-semibold">{asesoria.fecha} - {asesoria.hora}</p>
                  <p className="text-gray-700">{asesoria.curso} - {asesoria.seccion}</p>
                </div>
                <button onClick={() => eliminarAsesoria(index)} className="bg-red-600 text-white rounded-full p-2 hover:bg-red-800 focus:outline-none">X </button>
              </li>
            ))}
          </ul>
        </div>)}
        
      </div>
    </div>
  );
}
