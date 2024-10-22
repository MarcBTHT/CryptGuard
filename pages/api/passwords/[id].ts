import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { service, username, password } = req.body;

    // Hash the password before updating it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password in the database
    const updatedPassword = await prisma.password.update({
      where: { id: parseInt(id as string) },
      data: { service, username, password: hashedPassword },
    });

    res.status(200).json(updatedPassword);
  } else if (req.method === "DELETE") {
    await prisma.password.delete({
      where: { id: parseInt(id as string) },
    });
    res.status(204).end(); // No Content
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}