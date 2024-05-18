import reservasData from '../../json/reservas.json';

export default function Home() {
    return (
        <main className="flex">

            <nav className="w-1/6 h-auto flex flex-col space-y-4 pr-4 bg-white pt-4">
                <a href="/principal" className="text-black py-2 px-4 hover:bg-orange-500 hover:text-white hover:rounded-r-full">Overview</a>
                <a href="#" className="py-2 px-4 bg-orange-500 text-white rounded-r-full">Asesores</a>
            </nav>

            <div className="flex justify-center items-center pt-8 w-5/6">
                <div className="grid grid-rows-2 h-3/4 w-2/3">
                    <div className="grid grid-rows-2">
                        <div className="row-start-1 flex items-center justify-center">
                            <div className="w-48 h-48 bg-blue-500 rounded-full flex items-center justify-center">
                                <p className="text-white font-bold text-lg">Imagen</p>
                            </div>
                        </div>
                        <div className="row-start-2 items-center justify-center grid grid-rows-3 h-3/4">
                            <div className="row-start-1 flex items-center justify-center">
                                <p className="text-gray-500 font-bold text-xl pt-10">Fiorella Capcha</p>
                            </div>
                            <div className="row-start-2 flex justify-center">
                                <p className="text-gray-500">fcapcha@ulima.edu.pe</p>
                            </div>
                        
                            <div className="row-start-3 flex items-center justify-center"> 
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-start-1 flex items-center justify-center">
                                        <div className="px-6 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                            <p className="text-white font-bold">Gest. Ope.</p>
                                        </div>
                                    </div>
                        
                                    <div className="col-start-2 flex items-center justify-center">
                                        <div className="px-6 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                            <p className="text-white font-bold">Simulacion</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-4 gap-3 grid-cols-5">
                        <div className="col-start-1 row-start-1 "> 
                            <div className="flex items-center justify-center py-10"> ID </div> 
                        </div>
                        <div className="col-start-2 row-start-1"> 
                            <div className="flex items-center justify-center py-10"> Fecha </div> 
                        </div>
                        <div className="col-start-3 row-start-1"> 
                            <div className="flex items-center justify-center py-10"> Hora </div> 
                        </div>
                        <div className="col-start-4 row-start-1">
                            <div className="flex items-center justify-center py-10">Curso </div> 
                        </div>
                        <div className="col-start-5 row-start-1">
                            <div className="flex items-center justify-center py-10"> Acciones </div>
                        </div>
                        <div className="col-start-1 row-start-2 col-span-5"><div className="rounded-full h-20 w-100 bg-gray-50"> </div></div>
                        <div className="col-start-1 row-start-2">
                            <div className="flex items-center justify-center h-20">289272304</div>
                        </div>
                        <div className="col-start-2 row-start-2">
                            <div className="flex items-center justify-center h-20">22/12/2019</div>
                        </div>
                        <div className="col-start-3 row-start-2">
                            <div className="flex items-center justify-center h-20">14:00 - 15:00</div> 
                        </div>
                        <div className="col-start-4 row-start-2">
                            <div className="flex items-center justify-center h-20">Simulacion</div> 
                        </div>
                        <div className="col-start-5 row-start-2 flex items-center justify-center">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-full">
                                Ingresar
                            </button>
                        </div>
                        <div className="col-start-1 row-start-3 col-span-5"><div className="rounded-full h-20 w-100 bg-gray-50"> </div></div>
                        <div className="col-start-1 row-start-3">
                            <div className="flex items-center justify-center h-20">289272304</div> 
                        </div>
                        <div className="col-start-2 row-start-3">
                            <div className="flex items-center justify-center h-20">22/12/2019</div> 
                        </div>
                        <div className="col-start-3 row-start-3">
                            <div className="flex items-center justify-center h-20">14:00 - 15:00</div> 
                        </div>
                        <div className="col-start-4 row-start-3">
                            <div className="flex items-center justify-center h-20">Simulacion</div> 
                        </div>
                        <div className="col-start-5 row-start-3 flex items-center justify-center">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-full">
                                Ingresar
                            </button>
                        </div>
                        <div className="col-start-1 row-start-4 col-span-5"><div className="rounded-full h-20 w-100 bg-gray-50"> </div></div>
                        <div className="col-start-1 row-start-4">
                            <div className="flex items-center justify-center h-20">289272304</div> 
                        </div>
                        <div className="col-start-2 row-start-4">
                            <div className="flex items-center justify-center h-20">22/12/2019</div> 
                        </div>
                        <div className="col-start-3 row-start-4">
                            <div className="flex items-center justify-center h-20">14:00 - 15:00</div> 
                        </div>
                        <div className="col-start-4 row-start-4">
                            <div className="flex items-center justify-center h-20">Simulacion</div> 
                        </div>
                        <div className="col-start-5 row-start-4 flex items-center justify-center">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded-full">
                                Ingresar
                            </button>
                        </div>
                    </div>
                </div> 
        </div>
      </main>
      
    )
  }
  