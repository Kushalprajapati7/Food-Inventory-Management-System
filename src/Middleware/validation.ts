import { Request, Response, NextFunction } from 'express';
import { CategoryValidation, FoodValidation, SupplierValidation, UserValidation } from '../validation/Validation';

export const validateUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("validation Middlware");
    await UserValidation.validateUser(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
    // next(error)
  }
};

export const validateFoodMiddleware = async(req:Request, res:Response, next:NextFunction)=>{
  try {
    // console.log("validation Middlware");

    await FoodValidation.validateFood(req.body);
    next();
  } catch (error) {
    // next(error)
    res.status(400).json({ error: error.errors });

  }
}

export const validateCategory = async(req:Request, res:Response, next:NextFunction)=>{
  try {
        // console.log("validation Middlware");
    await CategoryValidation.validateCategory(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });

  }
}

export const validateSupplier = async(req:Request, res:Response, next:NextFunction)=>{
  try {
    // console.log("validdate Supplier");
    
    await SupplierValidation.validateSupplier(req.body)
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
    
  }
}