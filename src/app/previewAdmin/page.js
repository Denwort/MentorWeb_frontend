import MentorWebIco from "./../MentorWebIco.png";
import Image from "next/image";

export const metadata = {
  title: "Admin Dashboard",
  description: "Página de administración",
};

export default function AdminDashboard({ children }) {
  return (
    <html lang="en">
      <body className="bg-customPink">
        <div className="flex h-screen">
          <div className="w-48 bg-gray-200 p-4">
            <h2>Cargar Horarios</h2>
            <ul>
              <li>Overview</li>
              <li>Asesores</li>
              <li>Subir Archivos</li>
              <li>Dashboard de Administración</li>
            </ul>
            {/* Este div expande el menú lateral hasta abajo de la página */}
            <div className="flex-grow"></div>
          </div>
          <div className="flex-1 p-4">
            <div className="container" style={{ padding: '20px' }}>
              <h2 className="subtitle" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#858585', marginBottom: '20px' }}>Account Status</h2>
              <div className="table" style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}>
                <div className="table-row" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
                  <div className="table-cell" style={{ flex: 1, padding: '10px' }}>
                    Account Status
                  </div>
                  <div className="table-cell" style={{ flex: 2, padding: '10px' }}>
                    User Name
                  </div>
                  <div className="table-cell" style={{ flex: 3, padding: '10px' }}>
                    Email
                  </div>
                  <div className="table-cell" style={{ flex: 1, padding: '10px' }}>
                    Action
                  </div>
                </div>
                {/* Aquí puedes repetir esta estructura para cada fila de la tabla */}
                <div className="table-row" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
                  <div className="table-cell" style={{ flex: 1, padding: '10px' }}>
                    <input type="checkbox" />
                    Activo
                  </div>
                  <div className="table-cell" style={{ flex: 2, padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ marginRight: '10px' }}>
                        <Image src="/user1.jpg" alt="User 1" width={30} height={30} />
                      </div>
                      John Doe
                    </div>
                  </div>
                  <div className="table-cell" style={{ flex: 3, padding: '10px' }}>
                    john.doe@example.com
                  </div>
                  <div className="table-cell" style={{ flex: 1, padding: '10px' }}>
                    <button className="delete-btn" style={{ backgroundColor: 'red', borderRadius: '5px', padding: '5px 10px', color: 'white', marginRight: '5px' }}>Eliminar</button>
                    <button className="edit-btn" style={{ backgroundColor: 'blue', borderRadius: '5px', padding: '5px 10px', color: 'white' }}>Editar</button>
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
