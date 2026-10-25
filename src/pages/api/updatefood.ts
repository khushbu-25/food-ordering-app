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
    const { id, name, category, price, description, image } = req.body;

    if (!id) {
      return res.status(400).json("Food id is required");
    }

    const [result] = await db.execute(
      `UPDATE foods
       SET name = ?,
           category = ?,
           price = ?,
           description = ?,
           image = ?
       WHERE id = ?`,
      [name, category, price, description, image, id],
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json("Failed to update food");
  }
}
