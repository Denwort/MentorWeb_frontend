"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useMiProvider } from "/src/context/context";
import React from "react";
import cursoDB from "../../../api/documentos.js";
import SVGdocumento from "../../../components/SVG/documento.js";

export default function RepositorioCurso() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // Esto para saber que usuario esta logeado
  //const { cuenta, setCuenta } = useMiProvider();
  //const estudiante_id = cuenta.persona.id;

  const [buscarDocumento, setBuscarDocumento] = useState("");
  const [resultados, setResultados] = useState(null);
  // Apartir de aqui borrar
  const data = {
    items: [
      {
        name: "Item 1",
        subitems: [
          { nombre: "Subitem 1-1", id: 1 },
          { nombre: "Subitem 1-2", id: 2 },
          { nombre: "Subitem 1-3", id: 3 },
        ],
      },
      {
        name: "Item 2",
        subitems: [
          { nombre: "Subitem 2-1", id: 4 },
          { nombre: "Subitem 2-2", id: 5 },
        ],
      },
      {
        name: "Item 3",
        subitems: [
          { nombre: "Subitem 3-1", id: 6 },
          { nombre: "Subitem 3-2", id: 7 },
          { nombre: "Subitem 3-3", id: 8 },
          { nombre: "Subitem 3-4", id: 9 },
        ],
      },
    ],
  };
  const flatList = data.items.flatMap((item) =>
    item.subitems.map((subitem) => ({
      itemName: item.name,
      subitemId: subitem.id,
      subitemName: subitem.nombre,
    }))
  );
  console.log(flatList);
  // Hasta aca borar

  const handleOnLoad = async () => {
    const cursoData = await cursoDB.findAll({ curso_id: id }); //Aun no implementan GET
    {
      /*  A LA ESPERA DE DAVID
        const documentosData = cursoData.secciones.flatMap(seccion =>
            seccion.documentos.map(documento => ({
                periodo: seccion.periodo.codigo,
                seccion: seccion.codigo,
                nombre: documento.nombre,
                descripcion: documento.descripcion;
                url: documento.archivo
            }))
        );
        console.log(documentosData)
        */
    }
    setResultados(cursoData);
  };

  const handleSearchChange = (e) => {
    setBuscarDocumento(e.target.value);
  };

  // const filteredDocumentos = resultados.filter((curso) =>
  //     curso.nombre
  //       .normalize("NFD")
  //       .replace(/[\u0300-\u036f]/g, "")
  //       .toLowerCase()
  //       .includes(buscarDocumento.toLowerCase())
  // );

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
      {/* Esto se usa como ejemplo de como espero que se muestre */}
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">
          Lista única de subitems
        </h1>
        <ul className="flex flex-wrap justify-center">
          {flatList.map((entry, index) => (
            <li
              key={entry.subitemId}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
                <div className="flex items-center justify-center mb-4">
                  <SVGdocumento className="text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">
                    {entry.subitemName}
                  </p>
                  <p className="text-sm text-gray-600">from {entry.itemName}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Fin del ejemplo */}
      {/* parte de la informacion del curso seleccionado */}
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold">{resultados.nombre}</h1>
      </div>

      {/* Barras de búsqueda */}
      <div className="flex justify-around p-4">
        <div className="flex flex-col">
          <input
            type="text"
            id="periodo"
            placeholder="Periodo 2024-1"
            className="w-48 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            id="seccion"
            placeholder="Seccion"
            className="w-48 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Parte de las secciones que existen */}
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-4 w-full">
          {resultados.secciones.map((seccion) => (
            <div key={seccion.id} className="flex flex-wrap items-center mb-8">
              {seccion.documentos.length !== 0 ? (
                seccion.documentos.map((documento) => (
                  <div
                    key={documento.id}
                    className="flex flex-col items-center w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-md"
                  >
                    <div className="w-full h-20 flex items-center justify-center mb-4">
                      <SVGdocumento className="text-blue-500" />
                    </div>
                    <div className="w-full text-center">
                      <p className="text-lg font-bold text-gray-800">
                        {documento.nombre} - {seccion.codigo}
                      </p>
                      <p className="text-sm text-gray-600">
                        {documento.descripcion}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex flex-col items-center w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                    <div className="w-full h-20 flex items-center justify-center mb-4">
                      <SVGdocumento className="text-blue-500" />
                    </div>
                    <div className="w-full text-center">
                      <p className="text-lg font-bold text-gray-800">
                        NOMBRE - {seccion.codigo}
                      </p>
                      <p className="text-sm text-gray-600">DESCRIPCION</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-80 bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                    <div className="w-full h-20 flex items-center justify-center mb-4">
                      <SVGdocumento className="text-blue-500" />
                    </div>
                    <div className="w-full text-center">
                      <p className="text-lg font-bold text-gray-800">
                        NOMBRE - {seccion.codigo}
                      </p>
                      <p className="text-sm text-gray-600">DESCRIPCION</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
