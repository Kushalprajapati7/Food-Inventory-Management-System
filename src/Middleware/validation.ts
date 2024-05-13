import { Request, Response, NextFunction } from 'express';
import { UserValidation } from '../validation/userValidation';

export const validateUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserValidation.validateUser(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};
