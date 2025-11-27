import { auth } from "@/auth";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MyReservationsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // On récupère les réservations de l'utilisateur, du plus récent au plus vieux
  const reservations = await prisma.reservation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#111] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-l-4 border-green-500 pl-4">Mes Billets</h1>

        {reservations.length === 0 ? (
          <div className="text-center py-12 bg-[#1c1c1c] rounded-xl">
            <p className="text-gray-400 mb-4">Vous n&apos;avez aucune réservation.</p>
            <Link href="/" className="text-green-500 hover:underline">Découvrir les films</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {reservations.map((res) => (
              <div key={res.id} className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800 flex flex-col md:flex-row justify-between items-center shadow-lg">
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{res.movieTitle}</h3>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>📍 {res.cinema}</p>
                    <p>🕒 {res.showTime}</p>
                    <p>💺 Sièges : <span className="text-white font-mono">{res.seats}</span></p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 text-right">
                  <span className="block text-xs text-gray-500 mb-1">
                    {new Date(res.createdAt).toLocaleDateString()}
                  </span>
                  <div className="bg-green-900/30 text-green-400 border border-green-900 px-4 py-2 rounded-lg font-bold">
                    {res.totalPrice.toLocaleString()} FCFA
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}