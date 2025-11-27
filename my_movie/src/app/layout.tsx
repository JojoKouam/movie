import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Providers from "../../components/Providers";
import Disclaimer from "../../components/Disclaimer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CinéMathé - Réservation de cinéma",
  description: "Clone de site de cinéma réalisé avec Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-[#111] text-white flex flex-col min-h-screen`}>
        <Providers>
        <Disclaimer />
        <Navbar />

        
        <main className="grow">
          {children}
        </main>

        
        <Footer />
        </Providers>
      </body>
    </html>
  );
}