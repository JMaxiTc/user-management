import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: "USER" }, // Agrega "role" si lo manejas
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "User already exists" });
  }
}
