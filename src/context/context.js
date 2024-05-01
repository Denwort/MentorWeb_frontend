'use client'
import { createContext, useContext, useState } from 'react'

const Context = createContext()

export function MiProvider(  {children}  ){

    // Valores iniciales de una cuenta de invitado
    const [cuenta, setCuenta] = useState({
        "tipo": "0",
        "cuenta": {
            "id": "-1",
            "usuario":"",
            "constrasenha":"",
        },
        "estudiante": {
            "id": "-1",
            "nombre":"",
            "correo":"",
        },
        "administrador": {
            "id": "-1",
            "nombre":"",
            "celular":"",
        },
    }) 

    return (
        <Context.Provider value={[cuenta, setCuenta]}>
            {children}
        </Context.Provider>
    )
}

export function useMiProvider(){
    return useContext(Context)
}