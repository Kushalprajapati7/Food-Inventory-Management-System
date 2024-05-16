import { inject, injectable } from "inversify";
import { FoodModel } from "../Models/Food.Model";
import { IFood } from "../Interfaces/foodInterface";
import { PipelineStage } from "mongoose";

@injectable()
export class FoodService {

    async addFood(name: string, description: string, category: string, supplier: string, price: string, quantity: string): Promise<IFood> {
        const newFood = await FoodModel.create({ name, description, category, supplier, price, quantity })
        return newFood;
    }

    async updateFood(id: string, name: string, description: string, category: string, supplier: string, price: string, quantity: string): Promise<IFood> {
        const updatedFood = await FoodModel.findByIdAndUpdate(id, { name, description, category, supplier, price, quantity }, { new: true });
        return updatedFood;
    }

    async deleteFood(id: string): Promise<void> {
        await FoodModel.findByIdAndDelete(id)
    }

    async showAllFood(): Promise<IFood[]> {
        const allFood = await FoodModel.find();
        return allFood;
    }

    async findFoodById(id: string): Promise<IFood> {
        const food = await FoodModel.findById(id);
        return food
    }
    async getAllFoods(page: number, limit: number, search?: string, filter?: string): Promise<IFood[]> {

        let pipeline: any[] = [];

        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { description: { $regex: search, $options: "i" } },
                        { category: { $regex: search, $options: "i" } },
                        { supplier: { $regex: search, $options: "i" } },
                        { price: Number(search) },
                        { quantity: Number(search) },
                    ]
                }
            });
        }

        if (filter) {
            pipeline.push({
                $match:
                    filter

            })
        }

        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        )

        const result = await FoodModel.aggregate(pipeline)

        return result
    }
}