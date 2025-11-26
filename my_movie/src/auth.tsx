// src/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
    
import { prisma } from "../lib/prisma";

  import bcrypt from "bcryptjs";
import { z } from "zod"; // Optionnel, mais NextAuth l'utilise souvent en interne

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // C'est cette fonction qui se lance quand on clique sur "Se connecter"
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // 1. On cherche l'utilisateur dans la BDD
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Utilisateur introuvable");
        }

        // 2. On vérifie si le mot de passe correspond au hash crypté
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        // 3. Si tout est bon, on retourne l'utilisateur
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // On dit à NextAuth que notre page de login est ici
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub; // On ajoute l'ID à la session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});