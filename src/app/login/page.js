'use client'
import React, { useState } from 'react';
import { useMiProvider } from '/src/context/context.js'
import { useRouter } from 'next/navigation.js';

export default function Home() {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { getCuenta, setCuenta } = useMiProvider();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "usuario":usuario,
          "contrasenha":password,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCuenta(data);
        if(data.persona.tipo == "Estudiante"){
          router.push('/estudiante/principal');
        }
        else if(data.persona.tipo == "Administrador"){
          router.push('/admin/principal');
        }
        
      } 
      else{
        const error = await response.text();
        alert(error);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (
      <div className="flex justify-center items-center  pt-8 ">
        <div className="grid grid-row-2 gap-2 w-2/3">
            <div className="w-full"><h1 className="font-bold ">Login</h1></div>

        <div className=" px-4 py-1 mt-2">
          <form className="bg-white shadow-md ">

            <div className="grid grid-row-4 px-48 py-32">

            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-4" >
                Usuario
              </label>
              <div className="flex items-center justify-center">
              <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Usuario" type="Usuario" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-4">
                Password
              </label>
              <div className="flex items-center justify-center">
              <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            <div className="flex items-center justify-center ">
              <div className='grid row-cols-2 gap-4'>
                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline text-center" type="button" onClick={handleLogin}>
                  Iniciar Sesión
                </button>

                
                <a href="/signup" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline text-center" type="button">Crear Cuenta</a>
                
              </div>
            </div>
            
            </div>

          </form>
        </div>  

        </div>
      </div>
    
    )
  }
