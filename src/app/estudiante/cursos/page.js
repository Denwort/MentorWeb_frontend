"use client";
import busqueda from "/public/busqueda.webp";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import cursosDB from "../../../api/cursos.js";
import SVGcuadernoSVG from "../../../components/SVG/cuadernos.js";

export default function RepositorioCursos() {
  const [buscarCurso, setBuscarCurso] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleOnLoad = async () => {
    const cursosData = await cursosDB.findAll({ keyword: "claveNormalizada" }); //Aun no implementan GET
    setResultados(cursosData);
  };

  useEffect(() => {
    handleOnLoad();
  }, []);

  if (resultados == []) {
    return <p>Cargando...</p>;
  }

  const handleSearchChange = (e) => {
    setBuscarCurso(e.target.value);
  };

  const filteredCursos = resultados.filter(
    (curso) =>
      curso.nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .includes(buscarCurso.toLowerCase()) ||
      curso.nivel.numero === parseInt(buscarCurso)
  );

  const headers = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div className="flex justify-center py-4">
      <div className="flex flex-col w-full">
        {/* main */}
        {/* Buscador de cursos */}
        <section className="flex p-3 bg-white rounded-lg mx-3 items-center">
          <p className="text-gray-500 text-xl font-bold mr-4">Buscar cursos</p>
          <div className="relative p-3.5 flex items-center">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <Image src={busqueda} alt="Icono" className="h-6 w-6" />
            </div>
            <input
              className="w-96 px-4 py-2 rounded-3xl pl-12 border-orange-500 focus:border-red-500"
              type="text"
              placeholder="Nombre del Curso o Nivel"
              value={buscarCurso}
              onChange={handleSearchChange}
            />
          </div>
        </section>
        {/* Contenido de cursos */}
        <section className="p-3.5 text-sm">
          {headers.map((index, key) => {
            const cursosNivelados = filteredCursos.filter(
              (curso) => curso.nivel.numero === index
            );
            return cursosNivelados.length > 0 ? (
              <div key={key} className="flex mb-6">
                {/* Nivel leído verticalmente */}
                <div className="flex-shrink-0 flex flex-col justify-center">
                  <h1 className="uppercase text-lg font-bold bg-orange-900 text-white py-2 px-4 transform -rotate-90 origin-center-left">
                    Nivel {index}
                  </h1>
                </div>

                {/* Contenedor de cursos */}
                <div className="flex flex-wrap justify-start items-start bg-white py-4 px-5 ml-4 w-full border border-gray-200 rounded-lg">
                  {cursosNivelados.map((curso) => (
                    <Link href={`./documentos/?id=${curso.id}`} key={curso.id}>
                      <div className="flex flex-row items-center justify-start h-24 w-48 my-2 mx-2 bg-white text-xs font-semibold border border-orange-500 p-2 rounded shadow-md hover:bg-gray-100 transition duration-300">
                        {/* SVG del curso */}
                        <div className="flex-shrink-0 mr-2">
                          <SVGcuadernoSVG />
                        </div>
                        {/* Texto del curso */}
                        <p className="flex-grow">{curso.nombre}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null; // No se renderiza nada si no hay cursos
          })}
        </section>
      </div>
    </div>
  );
}
