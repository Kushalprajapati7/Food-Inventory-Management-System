import mongoose,{Document} from "mongoose";

export interface IFood extends Document{
    _id?:mongoose.Schema.Types.ObjectId;
    name:string;
    description:string;
    category:string;
    supplier:string;
    price:number;
    quantity:number;
}