import mongoose, { Schema } from "mongoose";
import { IUser } from "../Interfaces/userInterface";


const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
    timestamps: true,
});


export const UserModel = mongoose.model<IUser>("User", userSchema);