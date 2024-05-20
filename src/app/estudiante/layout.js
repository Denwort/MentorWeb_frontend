"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ojo from "/public/ojo.png";
import persona from "/public/persona.webp";
import { useMiProvider } from '@/context/context';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [activePage, setActivePage] = useState(router.pathname);
  const [cuenta] = useMiProvider();

  const handleNavigation = (path) => {
    setActivePage(path);
    router.push(path);
  };

  useEffect(()=>{
    setActivePage("/estudiante/principal")
  },[])

  if (!cuenta){
    router.push('/');
    return (<p></p>)
  }

  return (
    <div className="flex h-max">
      <nav className="w-1/6 flex flex-col space-y-4 pr-4 bg-white pt-4">
        <div
          onClick={() => handleNavigation("./principal")}
          className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/estudiante/principal" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
        >
          <Image src={ojo} alt="Icono" className="h-6 w-6 mr-2" />
          Overview
        </div>
        <div
          onClick={() => handleNavigation("/estudiante/asesores")}
          className={`cursor-pointer flex items-center py-2 px-4 ${activePage === "/estudiante/asesores" ? "bg-orange-500 text-white rounded-r-full" : "text-black hover:bg-orange-500 hover:text-white hover:rounded-r-full"}`}
        >
          <Image src={persona} alt="Icono" className="h-6 w-6 mr-2" />
          Asesores
        </div>
      </nav>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
