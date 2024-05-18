'use client'
import Image from "next/image"
import ojo from "/public/ojo.png";
import persona from "/public/persona.webp";

export default function DashboardLayout({ children }) {
return (
    <div className="flex h-screen">
        <nav className="w-1/6 h-screen flex flex-col space-y-4 pr-4 bg-white pt-4">
            <a href="#" className="flex items-center py-2 px-4 bg-orange-500 text-white rounded-r-full">
            <Image src={ojo} alt="Icono" className="h-6 w-6 mr-2"/>
            Overview
            </a>
            <a href="/UserAsesores" className="flex items-center text-black py-2 px-4 hover:bg-orange-500 hover:text-white hover:rounded-r-full">
            <Image src={persona} alt="Icono" className="h-6 w-6 mr-2"/>
            Asesores
            </a>
        </nav>
        {children}
    </div>   
    )
}