export default function Home() {
  return (
    <main className="flex justify-center items-center  pt-8 ">
      <div className="grid grid-row-2 gap-2 w-2/3">
          <div class="w-full"><h1 class="font-bold ">Sign Up</h1></div>

      <div class=" px-4 py-1 mt-2">
        <form class="bg-white shadow-md ">

          <div className="grid grid-row-4 px-48 py-32">

          <div class="mb-6">
            <label class="block text-gray-700 text-sm mb-4" for="Nombres">
              Nombres y Apellidos
            </label>
            <div className="flex items-center justify-center">
            <input class="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Nombres" type="Nombres" placeholder="Nombres y Apellidos"/>
            </div>
          </div>  

          <div class="mb-6">
            <label class="block text-gray-700 text-sm mb-4" for="email">
              Email
            </label>
            <div className="flex items-center justify-center">
            <input class="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"/>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm mb-4" for="password">
              Password
            </label>
            <div className="flex items-center justify-center">
            <input class="border rounded-full w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-16 rounded-full focus:outline-none focus:shadow-outline" type="button">
              Sign Up
            </button>
          </div>
          
          </div>

        </form>
      </div>  

      </div>
    </main>
    
  )
}
