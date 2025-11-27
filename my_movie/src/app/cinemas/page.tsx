import Image from "next/image";
// import Link from "next/link";

// données
const CINEMAS = [
  {
    id: "cap-sud",
    name: "Pathé Cap Sud",
    address: "Centre Commercial Cap Sud, Marcory, Abidjan",
    image:
      "https://images.unsplash.com/photo-1517604931442-710c8ef5ad25?q=80&w=800&auto=format&fit=crop",
    features: ["Dolby Atmos", "4K Laser", "Salle VIP", "Parking"],
  },
  {
    id: "cosmos",
    name: "Majestic Cosmos",
    address: "Cosmos Yopougon, Abidjan",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
    features: ["3D", "Snack Bar", "Arcade"],
  },
  {
    id: "ivoire",
    name: "Majestic Ivoire",
    address: "Sofitel Hôtel Ivoire, Cocody, Abidjan",
    image:
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=800&auto=format&fit=crop",
    features: ["Salle Premium", "Lounge", "Fauteuils inclinables"],
  },
];

export default function CinemasPage() {
  return (
    <div className="min-h-screen bg-[#111] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Nos Cinémas
        </h1>
        <p className="text-gray-400 mb-12">
          Retrouvez vos films préférés dans nos salles à travers Abidjan.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CINEMAS.map((cinema) => (
            <div
              key={cinema.id}
              className="bg-[#1c1c1c] rounded-xl overflow-hidden border border-gray-800 hover:border-green-600 transition group"
            >
              {/* Image du cinéma */}
              <div className="h-48 w-full bg-gray-800 relative overflow-hidden">
                <Image
                  src={cinema.image}
                  alt={cinema.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1c1c1c] to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-xl font-bold text-white">
                    {cinema.name}
                  </h2>
                </div>
              </div>

              {/* Infos */}
              <div className="p-6">
                <p className="text-gray-400 text-sm mb-4 flex items-start gap-2">
                  📍 {cinema.address}
                </p>

                {/* Équipements */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cinema.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                  Voir les séances
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
