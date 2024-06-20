'use client';
import { useMiProvider } from '@/context/context';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import calendario from "/public/calendario.png";
import marcador from "/public/marcador.png";
import Image from "next/image";


export default function DashboardLayout({ children }) {

  const router = useRouter();
  const { cuenta, setCuenta } = useMiProvider();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname()
  const [activePage, setActivePage] = useState(pathname);

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

  const handleNavigation = (path) => {
    setActivePage(path);
    router.push(path);
  };


  return (
    <div className="flex h-screen">
          <nav class="min-w-52 h-screen flex flex-col space-y-4 pr-4 pt-4 bg-[#fdfdfd]">
            <div
                onClick={() => handleNavigation("/admin/principal")}
                className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/admin/principal" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
            >
                <Image src={calendario} alt="Icono" className="h-6 w-6 mr-2" />
                <span className="truncate">Cargar Horarios</span>
            </div>
            <div
                onClick={() => handleNavigation("/admin/tickets")}
                className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/admin/tickets" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
            >
                <Image src={marcador} alt="Icono" className="h-6 w-6 mr-2" />
                <span className="truncate">Tickets</span>
            </div>
            <button 
            className="cursor-pointer py-2 px-4 rounded-full hover:bg-red-400"
            onClick={()=>{setCuenta(); navigator.push}}>Cerrar sesion</button>
          </nav>
        {children}
    </div>   
    )
}