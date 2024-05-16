import mongoose,{Schema} from "mongoose";
import { IFood } from "../Interfaces/foodInterface";

const foodSchema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    category: {type:Schema.Types.String, required:true},
    supplier: {type:Schema.Types.String, required:true},
    price: {type:Number, required:true},
    quantity: {type:Number, required:true},
},{
    timestamps:true,
});

export const FoodModel = mongoose.model<IFood>("Food",foodSchema);
