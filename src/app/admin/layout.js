
export default function DashboardLayout({ children }) {
return (
    <div className="flex h-screen">
          <nav class="w-1/6 h-screen flex flex-col space-y-4 pr-4 bg-white pt-4">
            <a href="#" class="py-2 px-4 bg-orange-500 text-white rounded-r-full">Cargar Horarios</a>
          </nav>
        {children}
    </div>   
    )
}