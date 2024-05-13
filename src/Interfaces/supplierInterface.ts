import mongoose, {Document} from "mongoose";

export interface ISupplier extends Document{
    _id?:mongoose.Schema.Types.ObjectId,
    name: string,
    contactNo: number,
    address:string

}