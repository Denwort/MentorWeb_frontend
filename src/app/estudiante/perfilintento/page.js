'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMiProvider } from '/src/context/context';
import Image from "next/image";
import React from 'react';
import PopupForm from '../../../components/Popup.js';

export default function Home() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleButtonClick = () => {
      setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
      setIsPopupVisible(false);
    };
    
    return (
        <div className="flex flex-col justify-center items-center pt-8">
            
          <h1>Página principal</h1>
          <button onClick={handleButtonClick}>Mostrar Formulario</button>
          <PopupForm isVisible={isPopupVisible} onClose={handleClosePopup} />
            
        </div>
    );
    
    
}
