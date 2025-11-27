"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //la connexion par credentials
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, 
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
      } else {
        router.push("/");
        router.refresh(); 
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] px-4">
      <div className="bg-[#1c1c1c] p-8 rounded-2xl shadow-2xl border border-gray-800 w-full max-w-md">
        
        <div className="text-center mb-8">
          <span className="text-4xl">🍿</span>
          <h1 className="text-2xl font-bold text-white mt-2">Bon retour</h1>
          <p className="text-gray-400 text-sm">Connectez-vous pour réserver</p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={data.email}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
              placeholder="exemple@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              value={data.password}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-green-500 hover:underline font-medium">
            S&apos;inscrire
          </Link>
        </p>

      </div>
    </div>
  );
}