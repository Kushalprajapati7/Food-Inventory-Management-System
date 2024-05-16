import * as yup from 'yup';
import { IUser } from '../Interfaces/userInterface';
import { IFood } from '../Interfaces/foodInterface';
import { ICategory } from '../Interfaces/categoryInterface';
import { ISupplier } from '../Interfaces/supplierInterface';

export class UserValidation {
  public static userValidationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(6),
    email: yup.string().required().email(),
    role: yup.string().oneOf(['user', 'admin']).default('user'),
  });

  public static async validateUser(user: IUser): Promise<void> {
    await this.userValidationSchema.validate(user, { abortEarly: false });
  }
}


export class FoodValidation {
  public static foodValidationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    supplier: yup.string().required(),
    price: yup.number().positive('Price must be a positive number').required(),
    quantity: yup.number().integer('Quantity must be an integer').positive('Quantity must be a positive number').required()
  });

  public static async validateFood(food: IFood): Promise<void> {
    await this.foodValidationSchema.validate(food, { abortEarly: false })
  }
}

export class CategoryValidation {
  public static categoryValidationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required()
  });

  public static async validateCategory(category: ICategory): Promise<void> {
    await this.categoryValidationSchema.validate(category, { abortEarly: false })
  }
}

export class SupplierValidation {
  public static supplierValidationSchema = yup.object().shape({
    name: yup.string().required(),
    // contactNo: yup.number().max(10),
    contactNo: yup.string().matches(/^\d{10}$/, 'Contact number must be a 10-digit number').required('Contact number is required'),
    address: yup.string().required()
  });

  public static async validateSupplier(supplier: ISupplier): Promise<void> {
    await this.supplierValidationSchema.validate(supplier, { abortEarly: false })
  }
}