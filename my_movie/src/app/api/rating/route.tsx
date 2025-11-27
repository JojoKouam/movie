import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Non connecté" }, { status: 401 });

  const { movieId, score } = await req.json();

  try {
    // "upsert" est génial : si la note existe, il la met à jour. Sinon, il la crée.
    const rating = await prisma.rating.upsert({
      where: {
        userId_movieId: {
          userId: session.user.id,
          movieId: String(movieId),
        },
      },
      update: { score: Number(score) },
      create: {
        userId: session.user.id,
        movieId: String(movieId),
        score: Number(score),
      },
    });

    return NextResponse.json({ message: "Note enregistrée", rating });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Erreur" }, { status: 500 });
  }
}