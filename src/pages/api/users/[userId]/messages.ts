import { NextApiRequest, NextApiResponse } from "next";
import { initializeDB } from "../../../../database/helpers/initializeDB";
import Messages, { IMessages } from "../../../../database/models/Messages";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await initializeDB();
      const messages = await (Messages as any).find({
        userId: req.query.userId,
      });

      return res.status(200).json(messages);
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
};

export default handler;
