// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    // 1. Vérifier si les champs sont là
    if (!email || !name || !password) {
      return NextResponse.json({ message: "Champs manquants" }, { status: 400 });
    }

    // 2. Vérifier si l'email existe déjà
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 409 });
    }

    // 3. Hasher le mot de passe (Cryptage)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Créer l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // On retire le mot de passe de la réponse pour la sécurité
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}