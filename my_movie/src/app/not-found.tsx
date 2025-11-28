import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-6xl font-bold text-green-600 mb-4">404</h2>
      <p className="text-2xl text-white font-bold mb-2">Oups ! Page introuvable</p>
      <p className="text-gray-400 mb-8">Il semble que ce film n&apos;existe pas ou a été retiré de l&apos;affiche.</p>
      <Link href="/" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">
        Retourner à l&apos;accueil
      </Link>
    </div>
  )
}