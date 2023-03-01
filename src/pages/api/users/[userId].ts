import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { initializeDB } from "../../../database/helpers/initializeDB";
import Users from "../../../database/models/Users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await initializeDB();
    const user = await Users.findOne({ name: req.query.userId as any });

    return res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
