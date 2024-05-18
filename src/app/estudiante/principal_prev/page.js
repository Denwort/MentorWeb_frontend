'use client'
import { useRouter } from 'next/navigation';
import reservasData from '/src/json/reservas.json';

export default function home() {
  const router = useRouter();
  return (
     

          <div className="flex-1 p-4">
            <div className="container" style={{ padding: '20px' }}>
              <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Asesorías próximas</h2>
              <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px',  }}>

                {/*CARTAS DE LOS ASESORES*/}
                {reservasData.map((reserva) => (
                    <div key={reserva.id} className="card" style={{ width: 'calc(30% - 10px)', backgroundColor: "white", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', position: 'relative', padding: '20px' }}>
                        <div className="cardContent" style={{ display: 'flex', alignItems: 'center' }}>
                            {/* Contenedor de la imagen circular */}
                            <div className="imageContainer" style={{ position: 'relative', width: '100px', height: '100px', marginRight: '20px', background: 'linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 25%)' }}>
                                <div className="circleBorder" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '8px solid orange', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
                            </div>
                            <div className="textContent" style={{ flex: '1' }}>
                                <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{reserva.asesor}</h3>
                                <h1 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>{reserva.curso}</h1>
                                <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>{reserva.dia}</p>
                                <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>{reserva.hora}</p>
                            </div>
                        </div>
                        {/* Botón Ingresar */}
                        <button className="ingresar-btn" style={{ backgroundColor: '#ff6440', borderRadius: '10px', padding: '8px', color: 'white', width: '90px', position: 'absolute', bottom: '10px', right: '10px' }}>Ingresar</button>
                    </div>
                  ))}
                
              </div>
            </div>
          </div>
          
  );
}
