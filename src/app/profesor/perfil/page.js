'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context';
import Image from "next/image";
import React from 'react';
import PopupForm from '../../../components/PopupProfesor.js';

export default function Home() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { cuenta, setCuenta } = useMiProvider();
    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [foto, setFoto] = useState();
    const [isInfoUpdated, setIsInfoUpdated] = useState(false);  // Nuevo estado para controlar actualizaciones

    const obtenerInfoEstudiante = async () => {
        const id = cuenta?.id;
        if (!id) {
            console.error("Cuenta ID no está disponible");
            return;
        }
        setIsLoading(true);
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
                setInfo(data);
                console.log("Datos recibidos:", data);
                const fetchFile = async () => {
                    try {
                      const response = await fetch(data.persona.foto);
                      const blob = await response.blob();
                      const url = URL.createObjectURL(blob);
                      setFoto(url);
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
            console.error('Error al obtener la información del usuario:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const actualizarInfo = async (updatedData) => {
        const id = cuenta?.id;
        if (!id) {
            console.error("Cuenta ID no está disponible");
            return;
        }
        console.log(updatedData.photo)
        const formData = new FormData();
        formData.append("cuenta_id", id);
        formData.append("usuario", info.usuario);
        formData.append("contrasenha", updatedData.password);
        formData.append("pregunta_id", updatedData.recoveryQuestion);
        formData.append("respuesta", updatedData.recoveryAnswer);
        formData.append("nombres", updatedData.name);
        formData.append("correo", updatedData.email);
        if (updatedData.photo) {
            formData.append("foto", updatedData.photo);
        }else{
            formData.append("foto", null)
        }
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }


        try {
            const response = await fetch('http://127.0.0.1:8000/editarPerfilProfesor/', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setInfo(data);
                console.log("Datos actualizados:", data);
                setIsPopupVisible(false);
                setIsInfoUpdated(true);  // Actualizar el estado después de la actualización
                alert("Datos actualizados.")
            } else {
                console.error(`Error al actualizar la información del estudiante: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error al actualizar la información del estudiante:', error.message);
        }
    };

    useEffect(() => {
        if (cuenta?.id) {
            obtenerInfoEstudiante();
        } else {
            console.log("Esperando cuenta ID...");
        }
    }, [cuenta, isInfoUpdated]);  // Agregar isInfoUpdated a las dependencias para volver a ejecutar cuando cambie

    useEffect(() => {
        if (isInfoUpdated) {
            obtenerInfoEstudiante();
            setIsInfoUpdated(false);  // Resetear el estado después de obtener la nueva información
        }
    }, [isInfoUpdated]);

    const handleButtonClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="bg-white w-4/5 h-3/5 border-8 border-gray-500 flex">
            <div className="mt-4 self-center">
                <img src={foto} alt="Foto" className="ml-16 w-64 h-64 object-cover rounded-full shadow-sm" />
              </div>

                <div className="flex-col w-3/4 h-full pl-24 mt-32">
                    {isLoading ? (
                        <div className="mt-4">
                            <p className="text-gray-500 font-bold text-xl">Cargando...</p>
                        </div>
                    ) : error ? (
                        <div className="mt-4">
                            <p className="text-red-500 font-bold text-xl">Error: {error}</p>
                        </div>
                    ) : info ? (
                        <>
                            <div className="mt-4">
                                <p className="text-gray-500 font-bold text-xl">Nombre: {info.persona.nombres}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-500 font-bold text-xl">Correo: {info.persona.correo}</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-500 font-bold text-xl">Contraseña: *********</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-500 font-bold text-xl">Pregunta de recuperación: {info.pregunta.texto}</p>
                            </div>
                        </>
                    ) : (
                        <div className="mt-4">
                            <p className="text-gray-500 font-bold text-xl">No se encontró la información del estudiante.</p>
                        </div>
                    )}
                    <button className="mt-8 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleButtonClick}>
                        Editar Perfil
                    </button>
                </div>
                <PopupForm isVisible={isPopupVisible} onClose={handleClosePopup} onSubmit={actualizarInfo} />
            </div>
        </div>
    );
}