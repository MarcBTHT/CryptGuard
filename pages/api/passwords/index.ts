import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs"; // Import bcrypt

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { service, username, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Store the hashed password in the database
    const newPassword = await prisma.password.create({
      data: {
        service,
        username,
        password: hashedPassword, // Store the hashed password
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
