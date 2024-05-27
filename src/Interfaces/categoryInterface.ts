import mongoose,{Document, Types} from "mongoose";

export interface ICategory extends Document{
    _id?: Types.ObjectId;
    name: string,
    description:string,
}
