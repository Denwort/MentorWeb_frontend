'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation.js';


export default function Home() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(0);


  const handleSignUp = async () => {
  
    if( (email != null || email != "") && (name != null || name != "") && (usuario != null || usuario != "") && (password != null || password != "")){
      try {
        const response = await fetch(' http://127.0.0.1:8000/registrar/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "nombres": name,
            "correo": email,
            "usuario": usuario, 
            "contrasenha": password, 
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          alert("Registro exitoso");
          router.push('/login')
        } 
        else {
          const error = await response.text();
          alert(error.length < 100 ? error: 'Error');
        }
  
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }else{
      alert("tienes espacios en blanco")
    }
  };

  
  const validatePassword = (value) => {
    const errors = {};

    if (!/(?=.*[A-Z])/.test(value)) {
      errors.uppercase = 'Debe contener al menos una mayúscula';
    }

    if (!/(?=.*[!@#$%^&*])/.test(value)) {
      errors.specialChar = 'Debe contener al menos un carácter especial';
    }

    if (!/(?=.*\d)/.test(value)) {
      errors.number = 'Debe contener al menos un número';
    }

    return errors;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const newErrors = validatePassword(value);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setHasError(1);
    } else {
      setHasError(0);
    }
  };

  return (
    <main className="flex justify-center items-center  pt-8 ">
      <div className="grid grid-row-2 gap-2 w-2/3">
          <div className="w-full"><h1 className="font-bold ">Sign Up</h1></div>

      <div className=" px-4 py-1 mt-2">
        <form className="bg-white shadow-md ">

          <div className="grid grid-row-4 px-48 py-32">

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-4" >
              Nombres y Apellidos
            </label>
            <div className="flex items-center justify-center">
            <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Nombres" type="Nombres" placeholder="Nombres y Apellidos" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>  

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-4" >
              Email
            </label>
            <div className="flex items-center justify-center">
            <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-4" >
              Usuario
            </label>
            <div className="flex items-center justify-center">
            <input className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Usuario" type="Usuario" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
            </div>
          </div>

          <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-4">Password</label>
                <div className="flex items-center justify-center">
                  <input
                    className="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {errors.uppercase && <p className="text-red-500">{errors.uppercase}</p>}
                {errors.specialChar && <p className="text-red-500">{errors.specialChar}</p>}
                {errors.number && <p className="text-red-500">{errors.number}</p>}
              </div>

          <div className="flex items-center justify-center">

            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline" type="button" onClick={handleSignUp}>
              Crear Cuenta
            </button>
 
          </div>
          
          </div>

        </form>
      </div>  

      </div>
    </main>
    
  )
}
