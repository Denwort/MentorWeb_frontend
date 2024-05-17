
import MentorWebIco from "./../MentorWebIco.png";


export const metadata = {
  title: "Subir Archivos",
  description: "Página para subir archivos",
};

export default function UploadPage({ children }) {
  return (
    <html lang="en">
      <body className="bg-customPink">
        <div className="flex h-screen">
          <nav class="w-1/6 h-screen flex flex-col space-y-4 pr-4 bg-white pt-4">
              <a href="#" class="py-2 px-4 bg-orange-500 text-white rounded-r-full">Cargar Horarios</a>
          </nav>

          <div className="flex-1 p-4">
            <div className="container" style={{ padding: '20px' }}>
              <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#858585', marginBottom: '20px' }}>Subir Archivo</h2>
              <div className="cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {/* CARTAS DE LOS HORARIOS DE LOS PROFESORES */}
                <div className="card" style={{ backgroundColor: "white", border: "2px solid purple", width: 'calc(20% - 10px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', position: 'relative', padding: '20px' }}>
                  {/* Contenido de la carta -- Em este caso puse una asesoria para comprobar que la tarjeta se adapta al texto dentro, en este caso sería la imagen del horario*/}
                  <h3 className="cardTitle" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Hernan Nina SW2</h3>
                    <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>Miercoles</p>
                    <p className="cardSubtitle" style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>2:00 pm - 3:00 pm</p>
                  <img src="/horario1.jpg" alt="Horario 1" className="cardImage" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                </div>
              </div>
              {/* Botón para agregar una nueva carta */}
              <a href="/previewAdmin" className="ingresar-btn" style={{ backgroundColor: '#ff6440', borderRadius: '10px', padding: '8px', color: 'white', width: '90px', position: 'absolute', bottom: '10px', right: '10px'}}>add card</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
