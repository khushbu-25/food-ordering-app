import type { NextApiRequest, NextApiResponse } from "next";

import db from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json("Method not allowed");
  }

  try {
    const { name, category, price, description, image } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json("Name, category and price are required");
    }

    const [result] = await db.execute(
      `INSERT INTO foods
      (name, category, price, description, image)
      VALUES (?, ?, ?, ?, ?)`,
      [name, category, price, description, image],
    );

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json("Something wrong");
  }
}
