import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { TYPES } from "../types/types";
import { CategoryService } from "../Services/CategoryService";
import { validateCategory } from "../Middleware/validation";


@controller('/category')
export class CategoryController {
    constructor(@inject(TYPES.CategoryService) private categoryService: CategoryService) { }

    @httpPost('/add',validateCategory)
    async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description } = req.body;
            const newCategory = await this.categoryService.createCategory(name, description)
            res.status(201).json({ newCategory, message: "Category Added !" });

        } catch (error) {
            next(error)
        }
    }

    @httpDelete('/remove/:id')
    async deleteCategory(req:Request, res:Response, next:NextFunction):Promise<void>{
        try {
            const id= req.params.id;
            const category = await this.categoryService.getCategoryById(id);
            if(!category){
                res.status(500).json({message: "Entered Category Not Found !"})
                return
            }
            await this.categoryService.deleteCategory(id);
            res.status(200).json({ message: "Category Deleted !" });
            

        } catch (error) {
            next(error)
        }
    }  
    
    @httpPut('/update/:id')
    async updateCategory(req:Request, res:Response, next:NextFunction):Promise<void>{
        try {
            const id = req.params.id;
            const category = await this.categoryService.getCategoryById(id);
            if(!category){
                res.status(500).json({message: "Entered Category Not Found !"})
                return
            }
            const {name, description} = req.body;
            const updatedCategory = await this.categoryService.updateCategory(id,name,description);
            res.status(200).json({ message: "Category Updated !" ,updatedCategory});

        } catch (error) {
            next(error)
        }
    }

    @httpGet('/')
    async getAllCategory(req:Request, res:Response, next:NextFunction):Promise<void>{
        try {
            const allCategory = await this.categoryService.allCategory();
            res.status(200).json({ message: "All Category !" ,allCategory});
            
        } catch (error) {
            next(error)
        }
    }
}