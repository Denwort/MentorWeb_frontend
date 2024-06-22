'use client'
import React, { useState } from 'react';
import { useMiProvider } from '/src/context/context.js'
import { useRouter } from 'next/navigation.js';

export default function Home() {
  const [usuario, setUsuario] = useState('');
  const [nombres, setNombres] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [nuevaContrasenia, setNuevaContrasenia] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [mostrarPrincipal, setMostrarPrincipal] = useState(true);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [mostrarNcontra, setMostraNcontra] = useState(false);

  const enviar = async (id) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/recuperarPregunta/', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "usuario": usuario, "nombres": nombres }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPregunta(data["pregunta"]["texto"]);
        console.log(data["pregunta"]["texto"]);
        setMostrarPrincipal(false)
        setMostrarPregunta(true);        
      } else {
        alert("Los datos ingresados son incorrectos");
      }
    } catch (error) {
      console.error('Error al obtener las asesorías del estudiante:', error.message);
      throw error;
    }
  };
  const respuestaPregunta = async (id) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/recuperarRespuesta/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "usuario": usuario, "respuesta": respuesta }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("funciono");
        setMostrarPregunta(false);
        setMostraNcontra(true);        
      } else {
        alert("Los datos ingresados son incorrectos");
      }
    } catch (error) {
      console.error('Error al obtener las asesorías del estudiante:', error.message);
      throw error;
    }
    
  };
  const nuevaContra = async (id) => {
    console.log(usuario);
    console.log(nuevaContrasenia);
    try {
      const response = await fetch('http://127.0.0.1:8000/recuperarContrasenha/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "usuario": usuario, "nuevaContrasenia": nuevaContrasenia }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("funciono");
        setMostraNcontra(false);
        setMostrarPrincipal(true);
        alert("Se ha cambiado la contraseña exitosamente");        
      } 
    } catch (error) {
      console.error('Error al obtener las asesorías del estudiante:', error.message);
      throw error;
    }
    
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
      <div className="flex justify-center items-center  pt-8 ">
        <div className="grid grid-row-2 gap-2 w-2/3">
          <div className="w-full"><h1 className="font-bold ">Cambio de Contraseña</h1></div>
            <div className=" px-4 py-1 mt-2">
              <form className="bg-white shadow-md ">
                {mostrarPrincipal && (<div className="grid grid-row-4 px-48 py-32">          
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm mb-4" >
                    Nombres
                    </label>
                      <div className="flex items-center justify-center">
                        <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Nombre" type="Nombre" placeholder="Nombre" value={nombres} onChange={(e) => setNombres(e.target.value)}/>
                  </div>
                </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm mb-4">
                    Usuario
                    </label>
                      <div className="flex items-center justify-center">
                        <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Usuario" type="Usuario" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                      </div>
                  </div>
                    <div className="flex items-center justify-center ">
                      <div className='grid row-cols-2 gap-4'>
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline text-center" type="button" onClick={enviar}>
                        Cambio de Contraseña
                      </button>
                      </div>
                  </div>
                </div>)}
                      {mostrarPregunta && (
                      <div className="flex items-center justify-center">
                        <div id="pregunta" className="mb-6 space-y-4">
                          <div className="block text-gray-700 text-sm mb-4">
                              {pregunta && <p className="text-gray-700 text-2xl">{pregunta}</p>}
                          </div>
                        <div className="flex items-center justify-center">
                          <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="respuesta" type="respuesta" placeholder="respuesta" value={respuesta} onChange={(e) => setRespuesta(e.target.value)}/>
                        </div>
                        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline text-center" type="button" onClick={respuestaPregunta}>
                            Recuperar contraseña
                        </button>
                        </div>
                      </div>)}

                      {mostrarNcontra && (
                      <div className="flex items-center justify-center">
                        <div id="nuevaContra" className="mb-6 space-y-4">
                          <label className="block text-gray-700 text-sm mb-4">
                            Nueva Contraseña 
                          </label>
                            <div className="flex items-center justify-center">
                            <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nuevaContrasenia" type="nuevaContrasenia" placeholder="nuevaContrasenia" value={nuevaContrasenia} onChange={(e) => setNuevaContrasenia(e.target.value)}/>
                            </div>
                          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline text-center" type="button" onClick={nuevaContra}>
                          Confirmar
                          </button>
                        </div>
                      </div>)}
                      <div className="flex items-center justify-center mt-4">
                      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline text-center" type="button" onClick={refreshPage}>
                      Cancelar
                      </button>
                      <a href="/login" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline text-center">
                      Regresar  
                      </a>
                      </div>
              </form>
            </div>  
          </div>
      </div>
    
    )
  }
