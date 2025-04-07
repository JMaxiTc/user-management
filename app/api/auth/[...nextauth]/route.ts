import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are missing");
        }
        // Busca el usuario en la base de datos por el email
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });

        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
          throw new Error("Invalid credentials");
        }

        // Devuelve el usuario y el rol
        return {
          id: user.id,
          email: user.email,
          role: user.role,  // Asumiendo que tienes un campo "role" en tu modelo de usuario
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Asigna el id y el rol al objeto de la sesión
        session.user.id = token.sub ?? "";
        session.user.role = typeof token.role === "string" ? token.role : "";  // Añadido el rol a la sesión
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: { role: string } }) {
      if (user) {
        // Asigna el role al token cuando el usuario se autentica
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
