'use client'
import { useMiProvider } from '@/context/context';
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {

  const router = useRouter();
  const [cuenta] = useMiProvider();

  if (!cuenta){
    router.push('/');
    return (<p></p>)
  }

  return (
    <div className="flex h-screen">
          <nav class="w-1/6 h-screen flex flex-col space-y-4 pr-4 bg-white pt-4">
            <p class="py-2 px-4 bg-orange-500 text-white rounded-r-full">Cargar Horarios</p>
          </nav>
        {children}
    </div>   
    )
}