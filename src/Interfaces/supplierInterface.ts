import mongoose, {Document, Types} from "mongoose";

export interface ISupplier extends Document{
    _id?:Types.ObjectId,
    name: string,
    contactNo: number,
    address:string

}