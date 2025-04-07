import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // Agrega role aquí
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string; // Agrega role aquí
  }

  interface JWT {
    role: string; // Agrega role aquí para que esté disponible en el token JWT
  }
}