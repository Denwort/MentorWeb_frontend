"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ojo from "/public/ojo.png";
import curso from "/public/curso.png";
import persona from "/public/persona.webp";
import marcador from "/public/marcador.png";
import perfil from "/public/perfil.png";
import { useMiProvider } from '@/context/context';
import { usePathname } from 'next/navigation';


export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname()
  const [activePage, setActivePage] = useState(pathname);
  
  const { cuenta, setCuenta } = useMiProvider();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log(router)
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
    <div className="flex flex-row">
        {/* Sidebar */}
        <nav className="min-w-52 min-h-[calc(100vh-7rem)] flex flex-col space-y-4 pr-4 pt-4 bg-[#fdfdfd]">
            <div
                onClick={() => handleNavigation("/estudiante/principal")}
                className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/estudiante/principal" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
            >
                <Image src={ojo} alt="Icono" className="h-6 w-6 mr-2" />
                <span className="truncate">Overview</span>
            </div>
            <div
                onClick={() => handleNavigation("/estudiante/asesores")}
                className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/estudiante/asesores" ? "bg-orange-500 text-white rounded-r-full" : activePage === "/estudiante/asesor" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
            >
                <Image src={persona} alt="Icono" className="h-6 w-6 mr-2" />
                <span className="truncate">Asesores</span>
            </div>
            <div
                onClick={() => handleNavigation("/estudiante/cursos")}
                className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/estudiante/cursos" ? "bg-orange-500 text-white rounded-r-full" : activePage === "/estudiante/curso" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
            >
                <Image src={curso} alt="Icono" className="h-6 w-6 mr-2" />
                <span className="truncate">Cursos</span>
            </div>
            <div
                onClick={() => handleNavigation("/estudiante/perfil")}
                className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/estudiante/perfil" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
            >
                <Image src={perfil} alt="Icono" className="h-6 w-6 mr-2" />
                <span className="truncate">Perfil</span>
            </div>
            <div
                onClick={() => handleNavigation("/estudiante/tickets")}
                className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/estudiante/tickets" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
            >
                <Image src={marcador} alt="Icono" className="h-6 w-6 mr-2" />
                <span className="truncate">Tickets</span>
            </div>
            <button 
            className="cursor-pointer py-2 px-4 rounded-full hover:bg-red-400"
            onClick={()=>{setCuenta(); navigator.push}}>Cerrar sesion</button>
        </nav>

        {/* Main content */}
        <main className="flex-grow overflow-y-auto">
            {children}
        </main>
    </div>
);

}
