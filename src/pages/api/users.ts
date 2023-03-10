import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { initializeDB } from "../../database/helpers/initializeDB";
import Users, { IUser } from "../../database/models/Users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await initializeDB();
      const user = await Users.create({
        name: req.body.name,
        role: "user",
      } as Partial<IUser>);

      return res.status(200).json(user);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
};

export default handler;
