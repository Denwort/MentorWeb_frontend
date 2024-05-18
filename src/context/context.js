'use client'
import { createContext, useContext, useState } from 'react'

const Context = createContext()

export function MiProvider(  {children}  ){

    // Valores iniciales de una cuenta de invitado
    const [cuenta, setCuenta] = useState() 

    return (
        <Context.Provider value={[cuenta, setCuenta]}>
            {children}
        </Context.Provider>
    )
}

export function useMiProvider(){
    return useContext(Context)
}