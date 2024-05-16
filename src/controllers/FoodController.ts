import { inject, injectable } from "inversify";
import { FoodService } from "../Services/FoodService";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { TYPES } from "../types/types";
import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../Services/CategoryService";
import { SupplierService } from "../Services/SupplierService";
import { validateFoodMiddleware } from "../Middleware/validation";

@controller('/food')
export class FoodController {
    constructor(@inject(TYPES.FoodService) private foodService: FoodService,
        @inject(TYPES.CategoryService) private categoryService: CategoryService,
        @inject(TYPES.SupplierService) private supplierService: SupplierService) { }

    @httpPost('/add', validateFoodMiddleware)
    async addFood(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description, category, supplier, price, quantity } = req.body;

            const categoryData = await this.categoryService.getCategoryById(category);
            const supplierData = await this.supplierService.findSupplierById(supplier);

            // console.log(categoryData.name, "category");
            // console.log(supplierData.name, "supplier");

            // const newFood = await this.foodService.addFood(name, description, category, supplier, price, quantity)
            const newFood = await this.foodService.addFood(name, description, categoryData.name, supplierData.name, price, quantity)
            res.status(201).json({ newFood, message: "New Food Added" })

        } catch (error) {
            next(error)
        }
    }

    @httpPut('/update/:id')
    async updateFood(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const { name, description, category, supplier, price, quantity } = req.body;
            const foodData = await this.foodService.findFoodById(id);

            if (!foodData) {
                res.status(404).json({ message: "Food Not Found !" });
                return
            }

            const categoryData = await this.categoryService.getCategoryById(category);
            const supplierData = await this.supplierService.findSupplierById(supplier);

            const updateFood = await this.foodService.updateFood(id, name, description, categoryData.name, supplierData.name, price, quantity)
            res.status(200).json({ updateFood, message: "Food Updated" })

        } catch (error) {
            next(error)
        }
    }

    @httpDelete('/delete/:id')
    async deleteFood(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id;
            const foodData = await this.foodService.findFoodById(id);

            if (!foodData) {
                res.status(404).json({ message: "Food Not Found !" });
                return
            }

            await this.foodService.deleteFood(id);
            res.status(200).json({ message: "Food Deleted" })


        } catch (error) {
            next(error)
        }
    }

    @httpGet('/')
    async showFoods(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const foodData = await this.foodService.showAllFood();
            if (foodData.length === 0) {
                res.status(404).json({ message: "Food's Data Not Found !" })
                return
            }
            res.status(200).json({ foodData, message: "Food's Data" })
            

        } catch (error) {
            // console.log("error",error);
            
            next(error)
        }
    }

    @httpGet('/byQuery')
    async allFoods(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { page, limit, search, filter } = req.query;

            const pageNumber = parseInt(page as string) || 1;
            const limitNumber = parseInt(limit as string) || 10;
            const searchString = search as string || '';
            const filterObject = filter ? JSON.parse(filter as string) : {};

            // console.log(pageNumber, limitNumber, searchString, filterObject);
            
            const food = await this.foodService.getAllFoods(pageNumber, limitNumber, searchString, filterObject);


            res.status(200).json({ food, message: "Food's Data" })


        } catch (error) {
            next(error)
        }
    }
}