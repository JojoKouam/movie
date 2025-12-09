import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Providers from "../../components/Providers";
import Disclaimer from "../../components/Disclaimer";

const inter = Inter({ subsets: ["latin"] });

const DOMAIN_URL = "https://cinemathe-jodev.vercel.app"; 
export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: {
    default: "CinéMathé | Démo Technique Fullstack Next.js",
    template: "%s | Projet Éducatif Next.js", // Ex: "Titanic | Projet Éducatif Next.js"
  },
  description: "Projet de démonstration technique réalisé par Josée Kouamé. Application Fullstack (Next.js 15, Prisma, Postgres) simulant une plateforme de réservation.",
  keywords: ["Portfolio Anabelle Josée Kouamé", "Développeur Fullstack", "Next.js 15", "Next.js", "React", "TypeScript", "Prisma", "Clone nextjs", "Projet Étudiant","Clone Movie", "Streaming", "Site movie en Nextjs", "Site Movie Nextjs",  "clone nextjs",  "Clone nextjs app"],
  openGraph: {
    title: "Démonstration technique - CinéMathé",
    description: "Découvrez cette application codée avec Next.js 15 et Tailwind CSS. Authentification, Base de données et API TMDB.",
    images: ["/cinemathe.png"], 
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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