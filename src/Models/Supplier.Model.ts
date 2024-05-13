import mongoose, { Schema } from "mongoose";
import { ISupplier } from "../Interfaces/supplierInterface";

const supplierSchema = new Schema(
    {
        name: { type: String, required: true },
        contactNo: { type: Number, required: true },
        address: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

export const SupplierModel = mongoose.model<ISupplier>("Supplier", supplierSchema);