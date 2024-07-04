'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupProfesor = () => {
  const [correo, setCorreo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleValidarCorreo = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/crear_cuenta_profesor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.mensaje);
        router.push('/');
      } else {
        const error = await response.text();
        alert('Error en la validación del correo: ' + (error.length < 100 ? error : 'Error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la validación del correo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-60">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Validación de Correo para Profesores</h2>
        <div className="mb-5">
          <label className="block mb-2 text-gray-700">Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Introduce tu correo"
          />
        </div>
        <button
          onClick={handleValidarCorreo}
          className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Validando...' : 'Validar Correo'}
        </button>
      </div>
    </div>
  );
};

export default SignupProfesor;
