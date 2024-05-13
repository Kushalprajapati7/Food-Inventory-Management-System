import { inject, injectable } from "inversify";
import { CategoryModel } from "../Models/Category.Model";
import { ICategory } from "../Interfaces/categoryInterface";

@injectable()
export class CategoryService {
    async createCategory(name: string, description: string): Promise<ICategory> {
        const newCategory = await CategoryModel.create({ name, description });
        return newCategory
    }

    async deleteCategory(categoryId: string): Promise<void> {
        await CategoryModel.findByIdAndDelete(categoryId);
    }

    async updateCategory(categoryId: string, name: string, description: string): Promise<ICategory> {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, { name, description }, { new: true })
        return updatedCategory
    }

    async allCategory(): Promise<ICategory[]> {
        const all = await CategoryModel.find();
        return all
    }

    async getCategoryById(id:string):Promise<ICategory>{
        const category = await CategoryModel.findById(id);
        return category;
    }
}