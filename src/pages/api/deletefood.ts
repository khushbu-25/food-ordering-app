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
    const { id } = req.query;

    if (!id) {
      return res.status(400).json("Food id is required");
    }

    const [result] = await db.execute("DELETE FROM foods WHERE id = ?", [id]);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json("Something wrong");
  }
}
