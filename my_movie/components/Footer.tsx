export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] border-t border-gray-800 py-8 text-gray-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xl mr-2">🍿</span>
          <span className="font-bold text-white">CinéMathé</span>
          <p className="mt-2">Clone  réalisé avec Next.js</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-green-500 transition">Mentions légales</a>
          <a href="#" className="hover:text-green-500 transition">Confidentialité</a>
          <a href="https://github.com/JojoKouam" target="_blank" className="hover:text-green-500 transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}