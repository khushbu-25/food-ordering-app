import type { NextApiRequest, NextApiResponse } from "next";

import db from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json("Method not allowed");
  }

  try {
    const [rows] = await db.query("SELECT * FROM foods ORDER BY id DESC");

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);

    return res.status(500).json("not getting foods");
  }
}
