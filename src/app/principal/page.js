'use client'
import Image from "next/image";
import ojo from "./../../../public/ojo.png";
import persona from "./../../../public/persona.webp";
import React, { useState, useEffect } from 'react';

const obtenerAsesoriasEstudiante = async (id) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/asesorias_estudiante/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "estudiante_id": id }),
    });
    if (!response.ok) {
      throw new Error(`Error al obtener las asesorías del estudiante: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener las asesorías del estudiante:', error.message);
    throw error;
  }
};

const AsesoriasEstudianteCards = () => {
  const [asesoriasData, setAsesoriasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerAsesoriasEstudiante(144);
        setAsesoriasData(data);
      } catch (error) {
        console.error('Error al obtener las asesorías del estudiante:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <html lang="en">
      <body className="bg-customPink" style={{ overflow: 'hidden' }}> {/*Overflow hidden para no poder desplazar la pagina*/}
        <div className="flex h-screen">
          <nav className="w-1/6 h-screen flex flex-col space-y-4 pr-4 bg-white pt-4">
            <a href="#" className="flex items-center py-2 px-4 bg-orange-500 text-white rounded-r-full">
              <Image src={ojo} alt="Icono" className="h-6 w-6 mr-2"/>
              Overview
            </a>
            <a href="/UserAsesores" className="flex items-center text-black py-2 px-4 hover:bg-orange-500 hover:text-white hover:rounded-r-full">
              <Image src={persona} alt="Icono" className="h-6 w-6 mr-2"/>
              Asesores
            </a>
          </nav>          

          <div className="flex-1 p-4">
            <div className="container" style={{ padding: '20px' }}>
              <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Asesorías próximas</h2>
              <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {asesoriasData.map((asesoriaMAIN) => (
                  <div key={asesoriaMAIN.id} className="card" style={{ width: 'calc(30% - 10px)', backgroundColor: "white", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', position: 'relative', padding: '20px' }}>
                    <div className="cardContent" style={{ display: 'flex', alignItems: 'center' }}>
                      <div className="imageContainer" style={{ position: 'relative', width: '100px', height: '100px', marginRight: '20px', background: 'linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 25%)' }}>
                        <div className="circleBorder" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '8px solid orange', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                      </div>
                      <div className="textContent" style={{ flex: '1' }}>
                        <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{asesoriaMAIN.asesoria.seccion.profesor.nombres}</h3>
                        <h1 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{asesoriaMAIN.asesoria.seccion.curso.nombre}</h1>
                        <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>{asesoriaMAIN.asesoria.fecha_inicio}</p>
                        <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>{asesoriaMAIN.asesoria.fecha_fin}</p>
                        <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>ID General: {asesoriaMAIN.id}</p> {/*Le puse el id general pq parecia que se repetian, pero solo era que tenian la misma info xd*/}
                      </div>
                    </div>
                    <button className="ingresar-btn" style={{ backgroundColor: '#ff6440', borderRadius: '10px', padding: '8px', color: 'white', width: '90px', position: 'absolute', bottom: '10px', right: '10px' }}>Ingresar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default AsesoriasEstudianteCards;
