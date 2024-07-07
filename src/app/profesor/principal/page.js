"use client";
import { useMiProvider } from "/src/context/context.js";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import listaReservasDB from "../../../api//reservasAsesoriasVistaProfesor.js";
import PopupAsesorias from "../../../components/sections/PopupAsesoriasProfesor.js"; // Ajusta la ruta según la ubicación de tu archivo

export default function UserAsesores() {
  const [asesorias, setAsesorias] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedAsesoria, setSelectedAsesoria] = useState(null);
  const { cuenta, setCuenta } = useMiProvider();

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
     return objeto.asesorias.map((asesoria) => {
       const fechaFormateada = formatearFecha(asesoria.fecha_inicio);
       const horaInicioFormateada = formatearHora(asesoria.fecha_inicio);
       const horaFinFormateada = formatearHora(asesoria.fecha_fin);

       return {
         fecha: fechaFormateada,
         hora_inicio: horaInicioFormateada,
         hora_fin: horaFinFormateada,
         curso: objeto.curso.nombre,
         ambiente: asesoria.ambiente,
         seccion: objeto.codigo,
         reservas: asesoria.reservas.map((reserva, index) => ({
           codigo: reserva.codigo,
           nombre: reserva.estudiante.nombres,
           foto: reserva.estudiante.foto,
           atendido: false,
           orden: index + 1,
         })),
       };
     });
   };

   // Función para filtrar asesorías de la semana
   const filtrarAsesoriasSemana = (asesorias) => {
     const hoy = new Date();
     const semanaDespues = new Date();
     semanaDespues.setDate(hoy.getDate() + 7);

     return asesorias.filter((asesoria) => {
       const fechaAsesoria = new Date(
         asesoria.fecha.split("/").reverse().join("-")
       );
       return fechaAsesoria >= hoy && fechaAsesoria <= semanaDespues;
     });
   };

  // Función principal para manejar la consulta
  const handleConsulta = async () => {
    const id_Profe = cuenta?.persona.id;
    if (!id_Profe) {
      console.error("Cuenta ID no está disponible");
      return;
    }
    try {
      const asesoresData = await listaReservasDB.findAll({
        profesor_id: id_Profe,
      });

      const dataLimpia = asesoresData
        .flatMap(transformarAsesoria)
        .filter((item) => item !== null);

      const asesoriasSemana = filtrarAsesoriasSemana(dataLimpia);

      setAsesorias(asesoriasSemana);
      console.log(asesoriasSemana);
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

  const handleAsesoriaClick = (asesoria) => {
    setSelectedAsesoria(asesoria);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedAsesoria(null);
  };

const handleAtencion = (codigoSeccion, index) => {
  setAsesorias((prevAsesorias) => {
    const newAsesorias = prevAsesorias.map((asesoria) => {
      if (asesoria.seccion === codigoSeccion) {
        const newReservas = asesoria.reservas.map((reserva, idx) => {
          if (idx === index) {
            return {
              ...reserva,
              atendido: true, // Cambio estático a true al hacer clic
            };
          }
          return reserva;
        });
        return {
          ...asesoria,
          reservas: newReservas,
        };
      }
      return asesoria;
    });
    return newAsesorias;
  });
};


  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Asesorías Programadas
        </h1>
        <div>
          {asesorias.length === 0 ? (
            <p className="text-gray-500 font-bold text-xl">
              No se tienen asesorías registradas
            </p>
          ) : (
             <div className="grid grid-cols-3 gap-x-4 gap-y-6">
              {asesorias.map((asesoria, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg px-5 py-4 border border-gray-300"
                >
                  <h2
                    className="text-lg font-semibold text-center text-gray-700 pb-1 mb-2 border-b hover:bg-gray-100 cursor-pointer border-gray-300"
                    onClick={() => handleAsesoriaClick(asesoria)}
                  >
                    {asesoria.curso} - {asesoria.seccion}
                  </h2>
                  <div className="grid justify-items-center">
                    <ul className="bg-white rounded-lg">
                      {asesoria.reservas.map((reserva, index) => (
                        <li
                          key={index}
                          className={`flex items-center py-3 px-4 hover:bg-gray-100 cursor-pointer ${
                            reserva.atendido
                              ? "border-green-500"
                              : "border-red-500"
                          } border-4 rounded-lg`}
                          onClick={() => handleAtencion(asesoria.seccion, index)}
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={reserva.foto}
                              alt={reserva.nombre}
                              className="h-12 w-12 rounded-full object-cover border border-gray-300"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-gray-800 font-semibold">
                              {reserva.orden}. {reserva.nombre}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Tiempo estimado:{" "}
                              {Math.floor(60 / asesoria.reservas.length)}{" "}
                              minutos
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedAsesoria && (
        <PopupAsesorias
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          asesoria={selectedAsesoria}
        />
      )}
    </div>
  );
}