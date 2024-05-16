
export default function home() {
  return (
    <html lang="en">
      <body className="bg-customPink">
        <div className="flex h-screen">
          <nav class="w-1/6 h-screen flex flex-col space-y-4 p-4 bg-white">
              <a href="#" class="py-2 px-4 bg-orange-500 text-white rounded-r-full">Overview</a>
              <a href="/UserAsesores" class="text-black py-2 px-4 hover:bg-orange-500 hover:text-white hover:rounded-r-full">Asesores</a>
          </nav>
          <div className="flex-1 p-4">
            <div className="container" style={{ padding: '20px' }}>
              <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Asesorías próximas</h2>
              <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px',  }}>
                {/*CARTAS DE LOS ASESORES*/}
                <div className="card" style={{ width: 'calc(30% - 10px)', backgroundColor: "white", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                  {/* Contenido de la carta */}
                  <img src="/imagen1.jpg" alt="Imagen 1" className="cardImage" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                  <div className="cardContent" style={{ padding: '20px' }}>
                    <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Hernan Nina SW2</h3>
                    <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Miercoles</p>
                    <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>2:00 pm - 3:00 pm</p>
                    {/* Botón Ingresar */}
                    <button className="ingresar-btn" style={{ backgroundColor: '#ff6440', borderRadius: '10px', padding: '8px', color: 'white', width: '90px', position: 'absolute', bottom: '10px', right: '10px'}}>Ingresar</button>
                  </div>
                </div>
                {/* Para cada carta que vayamos a hacer */}
                <div className="card" style={{ backgroundColor: "white", width: 'calc(30% - 10px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                  <img src="/imagen2.jpg" alt="Imagen 2" className="cardImage" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                  <div className="cardContent" style={{ padding: '20px' }}>
                    <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Jim Bryan Dios Luna RC</h3>
                    <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Miercoles</p>
                    <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>2:00 pm - 3:00 pm</p>
                    {/* Botón Ingresar */}
                    <button className="ingresar-btn" style={{ backgroundColor: '#ff6440', borderRadius: '10px', padding: '8px', color: 'white', width: '90px', position: 'absolute', bottom: '10px', right: '10px'}}>Ingresar</button>
                  </div>
                </div>
                <div className="card" style={{ backgroundColor: "white", width: 'calc(30% - 10px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                  <img src="/imagen3.jpg" alt="Imagen 3" className="cardImage" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                  <div className="cardContent" style={{ padding: '20px' }}>
                    <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Guillermo Zevallos Luna Victoria SIST ERP</h3>
                    <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Miercoles</p>
                    <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>2:00 pm - 3:00 pm</p>
                    {/* Botón Ingresar */}
                    <button className="ingresar-btn" style={{ backgroundColor: '#ff6440', borderRadius: '10px', padding: '8px', color: 'white', width: '90px', position: 'absolute', bottom: '10px', right: '10px'}}>Ingresar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
