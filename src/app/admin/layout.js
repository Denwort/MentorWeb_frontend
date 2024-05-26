'use client';
import { useMiProvider } from '@/context/context';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }) {

  const router = useRouter();
  const { cuenta, setCuenta } = useMiProvider();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !cuenta) {
      router.push('/');
    }
  }, [isClient, cuenta, router]);

  if (!isClient || !cuenta) {
    return <p></p>
  }


  return (
    <div className="flex h-screen">
          <nav class="min-w-52 h-screen flex flex-col space-y-4 pr-4 pt-4 bg-[#fdfdfd]">
            <p class="py-2 px-4 bg-orange-500 text-white rounded-r-full">Cargar Horarios</p>
            <button 
            className="cursor-pointer py-2 px-4 rounded-full hover:bg-red-400"
            onClick={()=>{setCuenta(); navigator.push}}>Cerrar sesion</button>
          </nav>
        {children}
    </div>   
    )
}