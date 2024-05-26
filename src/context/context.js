'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export function MiProvider({ children }) {
  const [cuenta, setCuentaState] = useState(null);

  useEffect(() => {
    const storedCuenta = localStorage.getItem('cuenta');
    if (storedCuenta) {
      setCuentaState(JSON.parse(storedCuenta));
    }
  }, []);

  const setCuenta = (cuenta) => {
    if (typeof window !== 'undefined') {
      if (cuenta) {
        localStorage.setItem('cuenta', JSON.stringify(cuenta));
        setCuentaState(cuenta);
      } else {
        localStorage.removeItem('cuenta');
        setCuentaState(null);
      }
    }
  };

  return (
    <Context.Provider value={{ cuenta, setCuenta }}>
      {children}
    </Context.Provider>
  );
}

export function useMiProvider() {
  return useContext(Context);
}
