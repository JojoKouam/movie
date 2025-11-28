
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
    
import { prisma } from "../lib/prisma";

  import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
     
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Utilisateur introuvable");
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

       
         return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // 👈 AJOUTE ÇA
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // On dit à NextAuth que notre page de login est ici
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role; // 1. On stocke le rôle dans le token
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string; // 2. On le passe à la session visible par le front
      }
      return session;
    },
  },
});