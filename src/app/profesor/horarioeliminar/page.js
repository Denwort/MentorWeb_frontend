"use client";
import { useMiProvider } from "/src/context/context.js";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function horarioExtraEliminar() {
  const {cuenta, setCuenta } = useMiProvider();
  const [asesorias, setAsesorias] = useState([]);
  const [mostrarPrincipal, setMostrarPrincipal] = useState(true);
  const [mostrarNoAsesorias, setmostrarNoAsesorias] = useState(false);

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
      objeto.asesorias.length > 0 ? objeto.asesorias : null;

    if (!primeraAsesoria) {
      return null;
    }

    let lista = [];
    for(let i = 0; i<primeraAsesoria.length; i++){

      const fechaFormateada = formatearFecha(primeraAsesoria[i].fecha_inicio);
      const horaInicioFormateada = formatearHora(primeraAsesoria[i].fecha_inicio);
      const horaFinFormateada = formatearHora(primeraAsesoria[i].fecha_fin);

    lista.push( {
      id: primeraAsesoria[i].id,
      fecha: fechaFormateada,
      hora_inicio: horaInicioFormateada,
      hora_fin: horaFinFormateada,
      curso: objeto.curso.nombre,
      ambiente: primeraAsesoria.ambiente,
      seccion: objeto.codigo,
    })
    }
    return lista;
  };

  // Función principal para manejar la consulta
  const handleConsulta = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/listar_extras/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profesor_id: cuenta.persona.id
        }),
      });
      const asesoresData = await response.json();
      console.log(asesoresData);

      const dataLimpia = asesoresData
        .map(transformarAsesoria).flat()
        .filter((item) => item !== null);

      setAsesorias(dataLimpia);
      console.log(dataLimpia);
      mostrar(dataLimpia);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const eliminarAsesoria = async (index) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta asesoría?")) {
      console.log(index);
      const response = await fetch('http://127.0.0.1:8000/cerrar_extra/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "asesoria_id":  index
        }),
      });
      alert("La asesoría ha sido eliminada exitosamente.");
      await handleConsulta();
    }
    
  };

  useEffect(() => {
    handleConsulta();
  }, []);

  const mostrar = (misasesorias) => {
    if(misasesorias.length == 0){
      console.log("sin asesorias")
      setMostrarPrincipal(false);
      setmostrarNoAsesorias(true);
    }
    else{
      console.log("con asesorias")
      setMostrarPrincipal(true);
      setmostrarNoAsesorias(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Eliminar Asesorías Extras
        </h1>
        {mostrarPrincipal && (<div>
          <ul>
            {asesorias.map((asesoria, index) => (
              <li key={index} className="flex items-center justify-between mb-4 p-4 border border-gray-300 rounded-lg bg-white">
                <div>
                  <p className="text-xl font-semibold">{asesoria.fecha} - {asesoria.hora_inicio}</p>
                  <p className="text-gray-700">{asesoria.curso} - {asesoria.seccion}</p>
                </div>
                <button onClick={() => eliminarAsesoria(asesoria.id)} className="bg-red-600 text-white rounded-full p-2 hover:bg-red-800 focus:outline-none">X </button>
              </li>
            ))}
          </ul>
        </div>)}
        {mostrarNoAsesorias && (<div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md">
          <p> No hay Asesorias Extras</p>
        </div>)}
      </div>
    </div>
  );
}
