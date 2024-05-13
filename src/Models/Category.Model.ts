import mongoose, { Schema } from "mongoose";
import { ICategory } from "../Interfaces/categoryInterface";

const categorySchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true
    })

export const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);