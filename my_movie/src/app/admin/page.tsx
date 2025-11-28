import { auth } from "@/auth";
import { prisma } from "lib/prisma";

export default async function AdminDashboard() {
  const session = await auth();

  // Si pas connecté OU pas d'ID
  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold text-red-500">
          🔒 Connectez-vous d&apos;abord
        </h1>
      </div>
    );
  }
  // Vérification  si l'utilisateur  est ADMIN
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold text-red-500">⛔ Accès Interdit</h1>
      </div>
    );
  }

  // RÉCUPÉRER LES STATS
  const [usersCount, reservations, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.reservation.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.reservation.aggregate({
      _sum: { totalPrice: true },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#111] text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard Administrateur 🛠️</h1>

        {/*  STATS CARDS  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-sm uppercase">Utilisateurs</h3>
            <p className="text-4xl font-bold text-blue-500">{usersCount}</p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-sm uppercase">Réservations</h3>
            <p className="text-4xl font-bold text-green-500">
              {reservations.length}
            </p>
          </div>
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-800">
            <h3 className="text-gray-400 text-sm uppercase">
              Chiffre d&apos;affaires
            </h3>
            <p className="text-4xl font-bold text-yellow-500">
              {(totalRevenue._sum.totalPrice || 0).toLocaleString()} FCFA
            </p>
          </div>
        </div>

        {/*  TABLEAU DES VENTES  */}
        <h2 className="text-xl font-bold mb-4">Dernières ventes</h2>
        <div className="bg-[#1c1c1c] rounded-xl overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-[#252525] text-white uppercase font-bold">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Film</th>
                  <th className="p-4">Montant</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr
                    key={res.id}
                    className="border-t border-gray-800 hover:bg-white/5 transition"
                  >
                    <td className="p-4">
                      {new Date(res.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-bold text-white">
                      {res.user.name}
                    </td>
                    <td className="p-4">{res.movieTitle}</td>
                    <td className="p-4 text-green-400 font-mono">
                      {res.totalPrice.toLocaleString()} F
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
