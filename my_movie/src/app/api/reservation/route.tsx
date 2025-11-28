import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/auth";
const PRICE_PER_SEAT = 3500
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const { movieId, movieTitle, cinema, showTime, seats } = body;
if (!Array.isArray(seats) || seats.length === 0) {
    return NextResponse.json({ message: "Aucun siège sélectionné" }, { status: 400 });
  }
    const realTotalPrice = seats.length * PRICE_PER_SEAT;
  try {
    const newReservation = await prisma.reservation.create({
      data: {
        userId: session.user.id,
        movieId: String(movieId),
        movieTitle,
        cinema,
        showTime,
        seats: seats.join(", "),
        totalPrice:realTotalPrice,
      },
    });
    return NextResponse.json(newReservation, { status: 201 });
     
  } catch (error) {
    console.error("ERREUR RÉSERVATION:", error);
    return NextResponse.json({ message: "Erreur création" }, { status: 500 });
  }
}