"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useMiProvider } from "/src/context/context";
import React from "react";
// import ReactPDF from "@react-pdf/renderer";
// import { PDFViewer } from "@react-pdf/renderer";
// import DocuPDF from "@/components/sections/DocuPDF.js";

import documentoDB from "../../../api/documento.js";

export default function RepositorioCurso() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // Esto para saber que usuario esta logeado
  const { cuenta, setCuenta } = useMiProvider();
  const estudiante_id = cuenta.persona.id;

  const [resultados, setResultados] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleOnLoad = async () => {
    const cursoData = await documentoDB.findAll({
      estudiante_id: estudiante_id,
      documento_id: id,
    }); //Aun no implementan GET
    setResultados(cursoData);
    setFileUrl(`http://localhost:8000${cursoData.archivo}`);
  };
  console.log(fileUrl);

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
    <div className="pt-8 text-center">
      <h1 className="text-2xl font-bold mb-4">{resultados.nombre}</h1>
      <p className="text-lg mb-6">{resultados.descripcion}</p>
      <div>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Abrir contenido en otra ventana
        </a>
      </div>

      {/* Tratando de hacer la previsualizacion */}
      <label
        style={{ display: "block", marginBottom: "10px", marginTop: "10px" }}
      >
        Visualización del archivo:
      </label>
      <embed src={fileUrl} type="application/pdf" width="100%" height="500px" />
    </div>
  );
}

// https://medium.com/@stheodorejohn/a-guide-to-display-pdf-documents-in-react-bcd9fb0f56b0
// https://dev.to/ryaddev/pdf-viewer-in-nextjs-134-using-react-pdf-viewer-nom
