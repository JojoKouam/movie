export default function Loading() {
  return (
    <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center gap-4">
      {/* Le rond qui tourne */}
      <div className="w-12 h-12 border-4 border-gray-600 border-t-green-500 rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm animate-pulse">Chargement du cinéma...</p>
    </div>
  );
}