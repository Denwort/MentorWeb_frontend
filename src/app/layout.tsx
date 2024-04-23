import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header";
import Registro from "./Registro";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });



const RootLayout = () => {
  return (
    <html lang="es">
      <head>
        <title>MentorWeb</title>
      </head>

      <body className="bg-customPink">

        <Header />
        
        <main>
          
        </main>

      </body>
    </html>
  );
};

export default RootLayout;