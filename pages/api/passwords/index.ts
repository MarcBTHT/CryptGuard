import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"; // Import des types

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { service, username, password } = req.body;
    const newPassword = await prisma.password.create({
      data: {
        service,
        username,
        password,
      },
    });
    res.status(201).json(newPassword);
  } else if (req.method === "GET") {
    const passwords = await prisma.password.findMany();
    res.status(200).json(passwords);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
