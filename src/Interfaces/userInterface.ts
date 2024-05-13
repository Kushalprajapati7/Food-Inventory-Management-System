import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    _id?: mongoose.Schema.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    role: string;
}
