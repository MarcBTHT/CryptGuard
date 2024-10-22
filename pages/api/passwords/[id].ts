import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"; // Import des types

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { service, username, password } = req.body;
    const updatedPassword = await prisma.password.update({
      where: { id: parseInt(id as string) }, // Utilisation de "as string" pour forcer le type
      data: { service, username, password },
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
