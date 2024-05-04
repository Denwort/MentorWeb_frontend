import MentorWebIco from "./../MentorWebIco.png";
import Image from "next/image";
import { useMiProvider } from './../../context/context.js'

export const metadata = {
  title: "MentorWeb",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <useMiProvider>
      <html lang="en">
        <body className="bg-customPink">
          <header className="bg-white p-8">
            <div className="flex items-center">
              <Image src={MentorWebIco} alt="MentorWeb Icon" width={50} height={50} />
              <h1 className="pt-3 ml-3">MentorWeb</h1>
            </div>
          </header>
          <div className="flex h-screen">
            <div className="w-48 bg-gray-200 p-4">
              <h2>Menú</h2>
              <ul>
                <li>Overview</li>
                <li>Asesores</li>
              </ul>
              {/* Este div expande el menú lateral hasta abajo de la página */}
              <div className="flex-grow"></div>
            </div>
            <div className="flex-1 p-4">
              <div className="container" style={{ padding: '20px' }}>
                <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Asesorías próximas</h2>
                <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                  {/*CARTAS DE LOS ASESORES*/}
                  <div className="card" style={{ width: 'calc(50% - 10px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                    {/* Contenido de la carta */}
                    <img src="/imagen1.jpg" alt="Imagen 1" className="cardImage" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    <div className="cardContent" style={{ padding: '20px' }}>
                      <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Hernan Nina SW2</h3>
                      <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Miercoles</p>
                      <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>2:00 pm - 3:00 pm</p>
                    </div>
                  </div>
                  {/* Para cada carta que vayamos a ahcer */}
                  <div className="card" style={{ width: 'calc(50% - 10px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src="/imagen2.jpg" alt="Imagen 2" className="cardImage" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    <div className="cardContent" style={{ padding: '20px' }}>
                      <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Jim Bryan Dios Luna RC</h3>
                      <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Miercoles</p>
                      <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>2:00 pm - 3:00 pm</p>
                    </div>
                  </div>
                  <div className="card" style={{ width: 'calc(50% - 10px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src="/imagen3.jpg" alt="Imagen 3" className="cardImage" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                    <div className="cardContent" style={{ padding: '20px' }}>
                      <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Guillermo Zevallos Luna Victoria SIST ERP</h3>
                      <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Miercoles</p>
                      <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>2:00 pm - 3:00 pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    </useMiProvider>
  )
}
