import mongoose,{Document, Types} from "mongoose";

export interface IFood extends Document{
    _id?:Types.ObjectId;
    name:string;
    description:string;
    category:Types.ObjectId;
    supplier:Types.ObjectId;
    price:number;
    quantity:number;
    image: string;
}