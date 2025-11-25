import type { Metadata } from "next";
// Importe ta police Google Font si tu en as une (Inter par défaut)
import { Inter } from "next/font/google"; 
import "./globals.css";

// Importe tes nouveaux composants
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CinéMathé - Réservation de cinéma",
  description: "Clone de Pathé CI réalisé avec Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-[#111] text-white flex flex-col min-h-screen`}>
        
        {/* 1. La Navbar est ici, fixe pour tout le site */}
        <Navbar />

        
        <main className="grow">
          {children}
        </main>

        
        <Footer />
        
      </body>
    </html>
  );
}