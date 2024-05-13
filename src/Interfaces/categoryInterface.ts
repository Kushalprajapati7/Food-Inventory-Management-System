import mongoose,{Document} from "mongoose";

export interface ICategory extends Document{
    _id?: mongoose.Schema.Types.ObjectId;
    name: string,
    description:string,
}
