import mongoose, { Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id?: Types.ObjectId;
    username: string;
    password: string;
    email: string;
    role: string;
}
