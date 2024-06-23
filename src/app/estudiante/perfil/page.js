'use client';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context';
import Image from "next/image";
import React from 'react';
import fotoError from "/public/persona.webp";
import PopupForm from '../../../components/Popup.js';

export default function Home() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { cuenta, setCuenta } = useMiProvider();
    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } else {
                const errorText = `Error al obtener la información del estudiante: ${response.statusText}`;
                console.error(errorText);
                setError(errorText);
            }
        } catch (error) {
            console.error('Error al obtener la información del estudiante:', error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const actualizarInfoEstudiante = async (updatedData) => {
        const id = cuenta?.id;
        if (!id) {
            console.error("Cuenta ID no está disponible");
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/editarPerfilEstudiante/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...updatedData, "cuenta_id": id }),
            });
            if (response.ok) {
                const data = await response.json();
                setInfo(data);
                console.log("Datos actualizados:", data);
                setIsPopupVisible(false);
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
    }, [cuenta]);

    const handleButtonClick = () => {
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="bg-white w-4/5 h-3/5 border-8 border-gray-500 flex flex-col items-center">
                <div className="w-48 h-48 rounded-full overflow-hidden m-11">
                    <Image
                        src={fotoError}
                        alt={"foto"}
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                        className="rounded-full"
                    />
                </div>

                <div className="flex-col w-full px-4 mt-4 text-center">
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
                <PopupForm isVisible={isPopupVisible} onClose={handleClosePopup} onSubmit={actualizarInfoEstudiante} />
            </div>
        </div>
    );
}