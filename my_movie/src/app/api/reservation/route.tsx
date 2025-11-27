import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Non autorisé" }, { status: 401 });

  const body = await req.json();
  const { movieId, movieTitle, cinema, showTime, seats, totalPrice } = body;

  try {
    const newReservation = await prisma.reservation.create({
      data: {
        userId: session.user.id,
        movieId: String(movieId),
        movieTitle,
        cinema,
        showTime,
        seats: seats.join(", "), // On transforme ["A1", "A2"] en "A1, A2"
        totalPrice
      }
    });
    return NextResponse.json(newReservation, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Erreur création" }, { status: 500 });
  }
}