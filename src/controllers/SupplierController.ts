import { Request, Response, NextFunction } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../types/types";
import { SupplierService } from "../Services/SupplierService";


@controller('/supplier')
export class SupplierController {
    constructor(@inject(TYPES.SupplierService) private supplierService: SupplierService) { }

    @httpPost('/add')
    async createSupplier(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, contactNo, address } = req.body;
            const newSupplier = await this.supplierService.createSupplier(name, contactNo, address)
            res.status(201).json({ message: "Supplier Added !", newSupplier });

        } catch (error) {
            next(error)
        }
    }

    @httpDelete('/remove/:id')
    async deleteSupplier(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const Supplier = await this.supplierService.findSupplierById(id);
            if (!Supplier) {

                res.status(500).json({ message: "Entered supplier is Not Found !" })
                return

            }
            await this.supplierService.deleteSupplier(id);
            res.status(200).json({ message: "Supplier Deleted !" });


        } catch (error) {
            next(error)
        }
    }

    @httpPut('/update/:id')
    async updateSupplier(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const Supplier = await this.supplierService.findSupplierById(id);
            if (!Supplier) {

                res.status(500).json({ message: "Entered supplier is Not Found !" })
                return

            }
            const { name, contactNo, address } = req.body;
            const updatedSupplier = await this.supplierService.updateSupplier(id, name, contactNo, address);
            res.status(200).json({ message: "Supplier Updated !", updatedSupplier });

        } catch (error) {
            next(error)
        }
    }

    @httpGet('/')
    async getAllSupplier(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const allCategory = await this.supplierService.showSupplier();
            res.status(200).json({ message: "All Supplier !", allCategory });

        } catch (error) {
            next(error)
        }
    }
}


