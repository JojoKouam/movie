"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function StarRating({ movieId, initialRating }: { movieId: string, initialRating: number }) {
  const [rating, setRating] = useState(initialRating); // La note validée
  const [hover, setHover] = useState(0); // La note au survol de la souris
  const router = useRouter();

  const handleRate = async (score: number) => {
    setRating(score); // Mise à jour visuelle immédiate

    const res = await fetch("/api/rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, score }),
    });

    if (res.ok) {
      toast.success(`Vous avez noté ce film ${score}/5 ⭐`);
      router.refresh();
    } else {
      toast.error("Erreur lors de la notation");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Votre note</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={star <= (hover || rating) ? "#eab308" : "none"} // Jaune si actif, vide sinon
              stroke={star <= (hover || rating) ? "#eab308" : "#4b5563"} // Bordure jaune ou grise
              strokeWidth={1.5}
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}