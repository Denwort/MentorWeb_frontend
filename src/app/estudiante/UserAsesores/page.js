import busqueda from "/public/busqueda.webp";
import Image from "next/image";
import ojo from "/public/ojo.png";
import persona from "/public/persona.webp";
import reservasData from '/src/json/reservas.json';


export default function UserAsesores() {
    return (

                    <div className="ml-20">
                        
                        <div className="row-start-1 mt-10 items-center justify-center">
                            <div className="row-start-1 flex ">
                                <p className="text-gray-500 font-bold text-xl">Buscar asesores</p>
                            </div>

                            <div class="row-start-1 mt-5 flex items-center">
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Image src={busqueda} alt="Icono" class="h-6 w-6"/>
                                    </div>
                                    <input class="w-full rounded-full border-2 border-orange-500 pl-10 py-2 focus:border-red-500" type="text" placeholder="Nombre del Asesor..." />
                                </div>
                                <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1.5 px-4 rounded-full ml-2">Buscar</button>
                            </div>
                        </div>

                            <div  className="grid grid-cols-4 gap-4  bg-white mt-10 pt-8 pl-8" style={{ width: '1100px', height: '500px' }}>

                                {reservasData.map((reserva) => (
                                        <a href="/listadoHorarios" key={reserva.id} className="block">

                                            <div className="relative w-48 h-48 bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center m-4">
                                                <div className="w-24 h-24 bg-white rounded-full overflow-hidden flex items-center justify-center">
                                                    
                                                    <Image src={persona} /*aca no c como llamar a la imagen del profesor xd*/ className="w-full h-full object-cover" />
                                                </div>
                                                <div className="mt-4">
                                                    <h1 className="text-white font-bold text-lg">{reserva.asesor}</h1>
                                                </div>
                                            </div>

                                        </a>
                                ))}
                            </div>

                    </div>

    );
}