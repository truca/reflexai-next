import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { initializeDB } from "../../database/helpers/initializeDB";
import Messages, { IMessages } from "../../database/models/Messages";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await initializeDB();
      const { userId, message: text } = req.body;
      const message = await Messages.create({
        userId,
        message: text,
        from: "user",
        createdAt: new Date(),
      } as Partial<IMessages>);

      return res.status(200).json(message);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
};

export default handler;
