import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // eslint-disable-next-line prefer-const
    let { email, name, password } = body;
    name = name ? name.trim() : "";
    email = email ? email.trim() : "";

    // Vérification des champs
    if (!email || !name || !password) {
      return NextResponse.json({ message: "Tous les champs sont obligatoires (sans espaces vides)" }, { status: 400 });
    }
    // Vérification du mdp
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Le mot de passe doit faire au moins 6 caractères" }, 
        { status: 400 }
      );
    }
    // Vérification du nom d'utilisateur
    if (name.length < 2) {
      return NextResponse.json(
        { message: "Le nom doit faire au moins 2 caractères" }, 
        { status: 400 }
      );
    }
    // Vérification des mails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "L'adresse email n'est pas valide" }, 
        { status: 400 }
      );
    }

    // l'email unique
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return NextResponse.json({ message: "Cet email est déjà utilisé" }, { status: 409 });
    }

    // hash mdp
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}