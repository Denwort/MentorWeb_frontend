export default function UserAsesores() {
    return (
        <html lang="en">
            <body className="bg-customPink">
                <div className="flex h-screen">
                    <div className="w-48 bg-gray-200 p-10">
                        <ul>
                            <li style={{ marginTop: '10px' }}>Overview</li>
                            <li style={{ marginTop: '10px' }}>Asesores</li>
                        </ul>
                    {/* Este div expande el menú lateral hasta abajo de la página */}
                    </div>
                    <div className="ml-20">
                        <div className="row-start-1 mt-10 items-center justify-center ">
                            <div className="row-start-1 flex ">
                                <p className="text-gray-500 font-bold text-xl">Buscar Asesores</p>
                            </div>
                            <div className="row-start-1 mt-5 flex ">
                                <input className =" w-full rounded-full  mr-2 " type="text" placeholder="  Nombre del Asesor..." ></input>
                                <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1.5 px-4 rounded-full"> Buscar</button>
                            </div>
                        </div>
                        <div className="row-start-1 flex bg-white mt-10 " style={{ width: '1100px', height: '500px' }}>
                            <div className="bg-orange-500 flex flex-col items-center justify-center m-7" style={{ width: '180px', height: '200px' }}>
                                <div className=" bg-blue-500 rounded-full flex items-center justify-center" style={{ width: '130px', height: '130px' }}>
                                    <p className="text-white font-bold text-lg">Imagen</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-white font-bold text-lg" >Hernan Nina</p>
                                </div>
                            </div>
                            <div className="bg-orange-500 flex flex-col items-center justify-center  m-7" style={{ width: '180px', height: '200px' }}>
                                <div className=" bg-blue-500 rounded-full flex items-center justify-center" style={{ width: '130px', height: '130px' }}>
                                    <p className="text-white font-bold text-lg">Imagen</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-white font-bold text-lg" >Jose Valdivia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}