import { useState, useEffect } from "react";

const PDFViewer = ({ fileUrl }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isPdf, setIsPdf] = useState(true);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        setFileName(fileUrl.split("/").pop());
        setIsPdf(blob.type === "application/pdf");
      } catch (error) {
        console.error("Error fetching the file:", error);
      }
    };

    fetchFile();

    // Clean up the URL object when the component unmounts
    return () => {
      URL.revokeObjectURL(pdfUrl);
    };
  }, [fileUrl]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {pdfUrl ? (
        isPdf ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full mb-4"
            style={{ border: "none" }}
          />
        ) : (
          <p className="text-gray-500 mb-4">
            No hay soporte para la previsualización de este archivo.
          </p>
        )
      ) : (
        <p className="text-gray-500 mb-4">Loading file...</p>
      )}
      {pdfUrl && !isPdf && (
        <a
          href={pdfUrl}
          download={fileName}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Descargar Archivo
        </a>
      )}
    </div>
  );
};

export default PDFViewer;
