import mongoose from "mongoose";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  name: string;
  role: UserRoles;
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
