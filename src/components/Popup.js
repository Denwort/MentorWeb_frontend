'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context';
import React from 'react';

const PopupForm = ({ isVisible, onClose, onSubmit }) => {
  const { cuenta } = useMiProvider();
  const [error, setError] = useState(null);
  const [foto, setFoto] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    recoveryQuestion: '',
    recoveryAnswer: '',
    photo: null,
    photoPreview: null,
  });

  const obtenerInfoEstudiante = async () => {
    const id = cuenta?.id;
    if (!id) {
        console.error("Cuenta ID no está disponible");
        return;
    }
    setError(null);
    try {
        const response = await fetch('http://127.0.0.1:8000/verPerfil/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "cuenta_id": id }),
        });
        if (response.ok) {
            const data = await response.json();
            const fetchFile = async () => {
              try {
                const response = await fetch(data.persona.foto);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setFoto(url);
                console.log("Datos recibidos pop-up:", data);
                setFormData({
                  name: data.persona.nombres,
                  email: data.persona.correo,
                  password: data.contrasenha,
                  recoveryQuestion: data.pregunta.texto,
                  recoveryAnswer: data.respuesta,
                  photo: null,
                  photoPreview: url,
                });
              } catch (error) {
                console.error("Error fetching the file:", error);
              }
            };
            fetchFile();
        } else {
            const errorText = `Error al obtener la información del estudiante: ${response.statusText}`;
            console.error(errorText);
            setError(errorText);
        }
    } catch (error) {
        console.error('Error al obtener la información del estudiante:', error.message);
        setError(error.message);
    }
  };

  useEffect(() => {
    if (cuenta?.id) {
        obtenerInfoEstudiante();
    } else {
        console.log("Esperando cuenta ID...");
    }
  }, [cuenta]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, recoveryQuestion, recoveryAnswer } = formData;
    if (!name || !email || !password || !recoveryQuestion || !recoveryAnswer) {
      setError('Todos los campos excepto la foto son obligatorios.');
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  const handleCancel = () => {
    obtenerInfoEstudiante();  // Reset the form data
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
        <h2 className="text-xl mb-4 text-center">Editar Perfil</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="recoveryQuestion" className="block text-sm font-medium text-gray-700">Pregunta de recuperación:</label>
              <input
                type="text"
                id="recoveryQuestion"
                name="recoveryQuestion"
                value={formData.recoveryQuestion}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="recoveryAnswer" className="block text-sm font-medium text-gray-700">Respuesta de recuperación:</label>
              <input
                type="text"
                id="recoveryAnswer"
                name="recoveryAnswer"
                value={formData.recoveryAnswer}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Foto:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
            {formData.photoPreview && (
              <div className="mt-4 self-center">
                <img src={formData.photoPreview} alt="Previsualización" className="mt-2 w-48 h-48 object-cover rounded-full shadow-sm" />
              </div>
            )}
          </div>
          <div className="col-span-2 flex justify-center mt-4 space-x-4">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Guardar
            </button>
            <button type="button" onClick={handleCancel} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;