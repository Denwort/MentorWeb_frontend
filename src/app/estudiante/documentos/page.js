"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useMiProvider } from "/src/context/context";
import React from "react";
import Link from "next/link";
import cursoDB from "../../../api/documentos.js";
import SVGdocumento from "../../../components/SVG/documento.js";

export default function RepositorioCurso() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // Esto para saber que usuario esta logeado
  //const { cuenta, setCuenta } = useMiProvider();
  //const estudiante_id = cuenta.persona.id;

  const [buscarDocumento, setBuscarDocumento] = useState("");
  const [buscarPeriodo, setBuscarPeriodo] = useState("");
  const [resultados, setResultados] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const maxLength = 50; // Limitar la cantidad de caracteres a mostrar

  const handleOnLoad = async () => {
    const cursoData = await cursoDB.findAll({ curso_id: id }); //Aun no implementan GET
    const documentosData = cursoData.secciones.flatMap((seccion) =>
      seccion.documentos.map((documento) => ({
        id: documento.id,
        periodo: seccion.periodo.codigo,
        seccion: seccion.codigo,
        nombre: documento.nombre,
        descripcion: documento.descripcion,
        url: documento.archivo,
      }))
    );
    setResultados(cursoData);
    setDocumentos(documentosData);
  };

  const handleSearchChange = (e) => {
    setBuscarDocumento(e.target.value);
  };

  const handlePeriodoChange = (e) => {
    setBuscarPeriodo(e.target.value);
  };

  const filteredDocumentos = documentos.filter(
    (documento) =>
      documento.nombre.toLowerCase().includes(buscarDocumento.toLowerCase()) &&
      documento.periodo.toLowerCase().includes(buscarPeriodo.toLowerCase())
  );

  useEffect(() => {
    handleOnLoad();
  }, [id]);

  if (resultados === null) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>Cargando documentos...</p>
      </div>
    );
  }

  return (
    <div className="pt-8">
      {/* parte de la informacion del curso seleccionado */}
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold">{resultados.nombre}</h1>
      </div>

      {/* Barras de búsqueda */}
      <div className="flex justify-around p-4">
        <div className="flex flex-col">
          <input
            type="text"
            id="documento"
            placeholder="Buscar documento"
            className="w-48 p-2 border border-gray-300 rounded-md"
            value={buscarDocumento}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            id="periodo"
            placeholder="Periodo 2024-1"
            className="w-48 p-2 border border-gray-300 rounded-md"
            value={buscarPeriodo}
            onChange={handlePeriodoChange}
          />
        </div>
      </div>
      {/* Parte de las secciones que existen */}
      <div>
        <ul className="flex flex-wrap justify-center p-2">
          {filteredDocumentos.map((documento, index) => (
            <Link
              href={`./documento/?id=${documento.id}`}
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div className="h-48 border border-gray-300 rounded-lg p-4 shadow-md bg-white flex flex-col justify-center items-center">
                <div className="flex items-center justify-center mb-4">
                  <SVGdocumento className="text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {documento.nombre} - {documento.seccion}
                  </p>
                  <p className="text-sm text-gray-600">
                    {documento.descripcion.length > maxLength
                      ? documento.descripcion.substring(0, maxLength) + "..."
                      : documento.descripcion}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
