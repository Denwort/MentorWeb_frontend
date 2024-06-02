"use client";
import busqueda from "/public/busqueda.webp";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function RepositorioCursos() {
  const [keyword, setKeyword] = useState("");
  const [resultados, setResultados] = useState([]);

  function handleChange(e) {
    setKeyword(e.target.value);
    handleConsulta(e.target.value);
  }

  const handleConsulta = async (clave) => {
    try {
      const claveNormalizada = clave
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
      const response = await fetch("http://127.0.0.1:8000/cursos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword: claveNormalizada,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let ordenado = data.sort((a, b) => {
          const nombreA = a.nombre
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          const nombreB = b.nombre
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          if (nombreA < nombreB) {
            return -1;
          }
          if (nombreA > nombreB) {
            return 1;
          }
          return 0;
        });
        setResultados(ordenado);
      } else {
        const error = await response.text();
        alert(error.length < 100 ? error : "Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleConsulta(keyword);
  }, []);

  const headers = Array.from({ length: 8 }, (_, index) => index + 3);

  return (
    <div className="flex justify-center py-4">
      <main className="flex flex-col w-full">
        {/* Buscador de cursos */}
        <section className="flex p-3 bg-white rounded-lg mx-3 items-center">
          <p className="text-gray-500 text-xl font-bold mr-4">Buscar cursos</p>
          <div className="relative p-3.5 flex items-center">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <Image src={busqueda} alt="Icono" className="h-6 w-6" />
            </div>
            <input
              className="max-w-3xl w-full px-4 py-2 rounded-3xl pl-12 border-orange-500 focus:border-red-500"
              type="text"
              placeholder="Nombre del Curso..."
              value={keyword}
              onChange={handleChange}
            />
          </div>
        </section>
        {/* Contenido de cursos */}
        <section className="p-3.5 text-sm">
          {resultados.length > 0 ? (
            headers.map((index, key) => {
              const cursosFiltrados = resultados.filter(
                (curso) => curso.nivel.numero === index
              );
              if (cursosFiltrados.length > 0) {
                return (
                  <div
                    key={key}
                    className="grid grid-cols-1 gap-4 place-items-center"
                  >
                    <articule ClassName="p-3 rounded-lg mx-3 flex justify-center">
                      <h1 className="text-xl font-bold  bg-orange-900">
                        Nivel {index}
                      </h1>
                    </articule>

                    <div className="flex flex-wrap justify-center items-stretch bg-white py-4 px-5">
                      {cursosFiltrados.map((curso) => (
                        <Link href={`./curso/?id=${curso.id}`} key={curso.id}>
                          <p className="h-[80px] w-40 my-2 mx-2 bg-red-400 text-center text-xs font-semibold grid place-items-center">
                            {curso.nombre}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              } else {
                return null; // No se renderiza nada si no hay cursos
              }
            })
          ) : (
            <p>No hay datos disponibles.</p>
          )}
        </section>
      </main>
    </div>
  );
}
