"use client"
import "./globals.css";
import MentorWebIco from "./MentorWebIco.png";
import Image from "next/image";
import { MiProvider, useMiProvider } from './../context/context.js'


export default function RootLayout({ children }) {

  return (
    <MiProvider>
      <html lang="en" className="h-screen">
        <body className="bg-customPink h-screen">
          <header className="bg-white h-28">
            <div className="grid grid-cols-2 p-8 w-52">
              <Image src={MentorWebIco} alt="MentorWeb Icon" width={50} height={50} />
              <h1 className="pt-3">MentorWeb</h1> 
            </div>
          </header>
          {children}
        </body>
      </html>
    </MiProvider>
  )
}
