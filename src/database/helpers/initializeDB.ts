import mongoose from "mongoose";

export async function initializeDB() {
  await mongoose.connect(process.env.MONGODB_URI);
}
