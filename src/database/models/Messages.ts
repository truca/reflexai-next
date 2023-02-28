import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

export interface IMessages {
  userId: string;
  message: string;
  createdAt: Date;
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
  mongoose.models.Messages || model<IMessages>("Messages", messageSchema);
export default Messages;
