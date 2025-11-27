import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { auth } from "@/auth";

// AJOUTER UN FAVORI (POST)
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Non connecté" }, { status: 401 });

  const { movieId } = await req.json();

  try {
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        movieId: String(movieId),
      }
    });
    return NextResponse.json({ message: "Ajouté aux favoris" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Erreur" }, { status: 500 });
  }
}

// SUPPRIMER UN FAVORI (DELETE)
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ message: "Non connecté" }, { status: 401 });

  const { movieId } = await req.json();

  try {
    await prisma.favorite.deleteMany({
      where: {
        userId: session.user.id,
        movieId: String(movieId),
      }
    });
    return NextResponse.json({ message: "Retiré des favoris" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Erreur" }, { status: 500 });
  }
}