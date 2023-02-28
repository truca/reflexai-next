import mongoose from "mongoose";

export interface IUser {
  name: string;
  role: "admin" | "user";
}

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
export default Users;
