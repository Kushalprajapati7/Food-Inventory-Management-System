import { inject, injectable } from "inversify";
import { SupplierModel } from "../Models/Supplier.Model";
import { ISupplier } from "../Interfaces/supplierInterface";

@injectable()
export class SupplierService {
    async createSupplier(name: string, contactNo: number, address: string): Promise<ISupplier> {
        const newSupplier = await SupplierModel.create({ name, contactNo, address });
        return newSupplier
    }
    async deleteSupplier(id: string): Promise<void> {
        await SupplierModel.findByIdAndDelete(id);
    }
    async updateSupplier(id: string, name: string, contactNo: number, address: string): Promise<ISupplier> {
        const updatedSupplier = await SupplierModel.findByIdAndUpdate(id, { name, contactNo, address }, { new: true })
        return updatedSupplier
    }
    async showSupplier(): Promise<ISupplier[]> {
        const allSupplier = await SupplierModel.find();
        return allSupplier;
    }

    async findSupplierById(id: string): Promise<ISupplier> {
        const supplier = await SupplierModel.findById(id);
        return supplier;
    }

    async getAllSupplier(page: number, limit: number, search?: string, filter?: any): Promise<ISupplier[]> {
        let pipeline: any[] = [];
      

        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { address: { $regex: search, $options: "i" } },
                        { contactNo: parseInt(search.toString()) || -1  }
                    ]
                }
            });
        }

        if (filter) {
            pipeline.push({ $match: filter });
        }

        
        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        )



        return await SupplierModel.aggregate(pipeline);
    }
}