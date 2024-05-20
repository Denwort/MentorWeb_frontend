'use client'
import busqueda from "/public/busqueda.webp";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function UserAsesores() {

    const [keyword, setKeyword] = useState('');
    const [resultados, setResultados] = useState([]);

    function handleChange(e){
        setKeyword(e.target.value);
        handleConsulta(e.target.value);
    }

    const handleConsulta = async (clave) => {
        try {
          const response = await fetch('http://127.0.0.1:8000/profesores/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "keyword":clave,
            }),
          });
          
          if (response.ok) {
            const data = await response.json();
            setResultados(data);
            console.log(data)
          } 
          else{
            const error = await response.text();
            alert(error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    
      }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getRandomGradient = () => {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        return `linear-gradient(to right, ${color1}, ${color2})`;
    };


    useEffect(()=>{
        handleConsulta(keyword);
    }, [])

    return (
      <div className="ml-10 md:ml-20">
          {/* Buscador de asesores */}
          <div className="mt-10 w-full md:w-5/6">
              <p className="text-gray-500 font-bold text-xl mb-5">Buscar asesores</p>
              <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Image src={busqueda} alt="Icono" className="h-6 w-6" />
                  </div>
                  <input
                      className="w-full rounded-full border-2 border-orange-500 pl-10 py-2 focus:border-red-500"
                      type="text"
                      placeholder="Nombre del Asesor..."
                      value={keyword}
                      onChange={handleChange}
                  />
              </div>
          </div>
  
          {/* Resultados de búsqueda */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-white my-10 py-8 px-8 w-full md:w-5/6">
              {resultados.map((reserva) => (
                  <Link href={`./asesor/?id=${reserva.id}`} key={reserva.id}>
                      <div className="relative w-full h-64 flex flex-col items-center justify-center p-4" style={{ background: getRandomGradient() }}>
                          <div className="absolute top-8 w-24 h-24 bg-white rounded-full overflow-hidden flex items-center justify-center">
                              <Image src={reserva.foto} alt="foto" width={100} height={100} className="w-full h-full object-cover" />
                          </div>
                          <div className="absolute bottom-8 w-full px-4">
                              <h1 className="text-white font-bold text-base text-center">{reserva.nombres}</h1>
                          </div>
                      </div>
                  </Link>
              ))}
              {resultados.length === 0 && <div className="text-center mt-4">Sin resultados</div>}
          </div>
      </div>
  );
  
}