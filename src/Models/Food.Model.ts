import mongoose,{Schema} from "mongoose";
import { IFood } from "../Interfaces/foodInterface";

const foodSchema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    category: {type:Schema.Types.ObjectId, required:true},
    supplier: {type:Schema.Types.ObjectId, required:true},
    price: {type:Number, required:true},
    quantity: {type:Number, required:true},
    image:{type:String, required:true}
},{
    timestamps:true,
});

export const FoodModel = mongoose.model<IFood>("Food",foodSchema);
