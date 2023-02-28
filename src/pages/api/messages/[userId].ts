import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      monitorCommands: true,
    });

    client.on("commandStarted", (started) => console.log(started));
    const collection = client.db("reflexai").collection("messages");
    const messages = await collection.find({ userId: _req.query.userId });

    const messagesArray = await messages.toArray();
    return res.status(200).json(messagesArray);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
