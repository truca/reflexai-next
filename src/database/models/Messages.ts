import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

export enum MessageFrom {
  USER = "user",
  BOT = "bot",
}

export interface IMessage {
  _id: string;
  userId: string;
  message: string;
  createdAt: Date;
  from: MessageFrom;
}

const messageSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  createdAt: {
    type: Date,
    unique: true,
    required: true,
  },
});

const Messages =
  mongoose.models.Messages || model<IMessage>("Messages", messageSchema);
export default Messages;
