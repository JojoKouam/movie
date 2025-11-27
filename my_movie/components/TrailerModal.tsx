"use client";
import { useState } from "react";

export default function TrailerModal({ videoKey }: { videoKey?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!videoKey) return null; // Pas de vidéo ? Pas de bouton.

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-700 transition flex items-center gap-2"
      >
        📺 Voir la bande-annonce
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-200 bg-black/90 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-xl bg-black/50 w-10 h-10 rounded-full z-10 hover:bg-red-600 transition"
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}