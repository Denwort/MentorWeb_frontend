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
            const response = await fetch("http://127.0.0.1:8000/cursos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    keyword: clave,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                let ordenado = data.sort((a, b) => {
                    const nombreA = a.nombre.toUpperCase();
                    const nombreB = b.nombre.toUpperCase();
                    if (nombreA < nombreB) {
                        return -1;
                    }
                    if (nombreA > nombreB) {
                        return 1;
                    }
                    return 0;
                });
                setResultados(ordenado);
                console.log(ordenado);
            } else {
                const error = await response.text();
                alert(error.length < 100 ? error : "Error");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const colors = [
        "#3498db",
        "#e74c3c",
        "#2ecc71",
        "#f39c12",
        "#1abc9c",
        "#e67e22",
        "#2c3e50",
        "#27ae60",
        "#e74c3c",
        "#f1c40f",
        "#9b59b6",
        "#16a085",
        "#e74c3c",
        "#95a5a6",
        "#f39c12",
        "#34495e",
        "#e74c3c",
        "#3498db",
        "#e74c3c",
        "#2ecc71",
    ];

    let lastColorIndex = -1; // Último índice de color usado

    const getRandomColor = () => {
        // Obtener un índice aleatorio que no sea el último utilizado
        let randomIndex = Math.floor(Math.random() * colors.length);
        while (randomIndex === lastColorIndex) {
            randomIndex = Math.floor(Math.random() * colors.length);
        }
        lastColorIndex = randomIndex; // Actualizar el último índice utilizado
        return colors[randomIndex];
    };

    const getRandomBackgroundColor = () => {
        return getRandomColor();
    };

    useEffect(() => {
        handleConsulta(keyword);
    }, []);

    const nivel_mas_alto = Math.max(...resultados)
    console.log(nivel_mas_alto)

    return (
        <div className="ml-10 md:ml-20">
            {/* Buscador de cursos */}
            <div className="mt-10 w-full">
                <p className="text-gray-500 font-bold text-xl mb-5">Buscar cursos</p>
                <div className="relative w-5/6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image src={busqueda} alt="Icono" className="h-6 w-6" />
                    </div>
                    <input
                        className="w-full rounded-full border-2 border-orange-500 pl-10 py-2 focus:border-red-500"
                        type="text"
                        placeholder="Nombre del Curso..."
                        value={keyword}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Resultados de búsqueda */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-white my-10 py-8 px-8 w-full md:w-5/6">
                {resultados.map((curso) => (
                    <Link href={`./curso/?id=${curso.id}`} key={curso.id}>
                        <div
                            className="relative w-full h-64 flex flex-col items-center justify-center p-4 rounded bg-blue-300"
                        >
                            <div className="absolute bottom-8 w-full px-4">
                                <h1 className="text-white font-bold text-base text-center">
                                    {curso.nombre}
                                </h1>
                            </div>
                        </div>
                    </Link>
                ))}
                {resultados.length === 0 && (
                    <div className="text-center mt-4">Sin resultados</div>
                )}
            </div>
            
        </div>
    );
}
