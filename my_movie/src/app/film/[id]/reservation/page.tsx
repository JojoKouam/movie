"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
    
import { useSession } from "next-auth/react";
import { useEffect } from "react"; 
import toast from "react-hot-toast";
  

// Configuration de la salle (6 rangées de 8 sièges)
const ROWS = 6;
const SEATS_PER_ROW = 8;
const PRICE_PER_SEAT = 3500; 

//  une fausse liste de sièges 
const OCCUPIED_SEATS = ["A3", "A4", "C5", "C6", "E1", "E2"];

 
export default function ReservationPage({  }: { params: { id: string } }) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: session, status } = useSession();
  
  // Liste des sièges 
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fonction qui gère le clic sur un siège
  const toggleSeat = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return; 

    if (selectedSeats.includes(seatId)) {
      
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
     
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
useEffect(() => {
   
    if (status === "unauthenticated") {
      router.push("/login"); 
    }
  }, [status, router]);
  if (status === "loading") {
    return <div className="min-h-screen bg-[#111] flex items-center justify-center text-white">Chargement...</div>;
  }
  
  // Si pas connecté, on retourne null pour ne rien afficher avant la redirection
  if (!session) return null;
  // Fonction pour payer 
  const handlePayment = async () => {
    if (selectedSeats.length === 0) return;
    
    setIsProcessing(true);
    
   try {
      // 1. On enregistre en BDD
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: id,
          movieTitle: "Film Réservé", 
          cinema: "Pathé Cap Sud",    
          showTime: "20h00",          
          seats: selectedSeats,
          totalPrice: selectedSeats.length * PRICE_PER_SEAT
        })
      });

      if (res.ok) {
        toast.success("Réservation validée !");
        router.push("/mes-reservations");
      } else {
        toast.error("Erreur lors de la réservation");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast.error("Erreur système");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-2xl font-bold mb-2 text-center">Choisissez vos places</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Écran face à vous</p>

        {/*  L'ÉCRAN  */}
        <div className="w-full h-4 bg-linear-to-b from-white/20 to-transparent rounded-t-full mb-12 mx-auto max-w-xl shadow-[0_10px_30px_rgba(255,255,255,0.1)]" />

        {/*  Grille de sièges */}
        <div className="flex flex-col gap-3 items-center mb-12">
          {Array.from({ length: ROWS }).map((_, rowIndex) => {
            // Lettre de la rangée
            const rowLabel = String.fromCharCode(65 + rowIndex);
            
            return (
              <div key={rowIndex} className="flex gap-2 md:gap-4">
                {Array.from({ length: SEATS_PER_ROW }).map((_, seatIndex) => {
                  const seatNumber = seatIndex + 1;
                  const seatId = `${rowLabel}${seatNumber}`;
                  
                  const isOccupied = OCCUPIED_SEATS.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      disabled={isOccupied}
                      onClick={() => toggleSeat(seatId)}
                      className={`
                        w-8 h-8 md:w-10 md:h-10 rounded-t-lg text-xs font-bold transition-all transform hover:scale-110
                        ${isOccupied 
                          ? "bg-gray-700 text-gray-500 cursor-not-allowed" // Occupé
                          : isSelected
                            ? "bg-green-500 text-white shadow-[0_0_15px_#22c55e]" // Sélectionné
                            : "bg-gray-800 text-gray-400 hover:bg-gray-600" // Libre
                        }
                      `}
                    >
                      {seatId}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/*LÉGENDE*/}
        <div className="flex justify-center gap-6 mb-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-800 rounded-sm"></div> Libre
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-700 rounded-sm"></div> Occupé
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm shadow-[0_0_10px_#22c55e]"></div> Sélection
          </div>
        </div>

        {/*BARRE DE PAIEMENT*/}
        <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 sticky bottom-4 shadow-2xl">
          <div>
            <p className="text-gray-400 text-sm">Total à payer</p>
            <p className="text-2xl font-bold text-white">
              {(selectedSeats.length * PRICE_PER_SEAT).toLocaleString()} FCFA
            </p>
            <p className="text-xs text-gray-500">{selectedSeats.length} place(s)</p>
          </div>

          <button
            onClick={handlePayment}
            disabled={selectedSeats.length === 0 || isProcessing}
            className="w-full md:w-auto bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-900/20"
          >
            {isProcessing ? "Paiement en cours..." : "Confirmer et Payer"}
          </button>
        </div>

      </div>
    </div>
  );
}