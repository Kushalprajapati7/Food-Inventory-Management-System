import { inject,injectable } from "inversify";
import { FoodModel } from "../Models/Food.Model";
import { IFood } from "../Interfaces/foodInterface";

@injectable()
export class FoodService{

    async addFood(name:string,description:string,category:string,supplier:string,price:string,quantity:string):Promise<IFood>{
        const newFood =  await FoodModel.create({name,description,category,supplier,price,quantity})
        return newFood;
    }

    async updateFood(id:string,name:string,description:string,category:string,supplier:string,price:string,quantity:string):Promise<IFood>{
        const updatedFood = await FoodModel.findByIdAndUpdate(id,{name,description,category,supplier,price,quantity},{new:true});
        return updatedFood;
    }

    async deleteFood(id:string):Promise<void>{
        await FoodModel.findByIdAndDelete(id)
    }

    async showAllFood():Promise<IFood[]>{
        const allFood = await FoodModel.find();
        return allFood;
    }

    async findFoodById(id:string):Promise<IFood>{
        const food = await FoodModel.findById(id);
        return food
    }
}