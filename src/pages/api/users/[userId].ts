import { NextApiRequest, NextApiResponse } from "next";
import getDBCollection from "../../../helpers/getDBCollection";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const collection = getDBCollection("users");
    const user = await collection.findOne({ _id: _req.query.userId as any });

    return res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
