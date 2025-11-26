// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // On importe depuis le fichier qu'on vient de créer
export const { GET, POST } = handlers;